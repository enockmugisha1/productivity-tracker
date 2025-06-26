import { Router } from 'express';
import { auth } from '../middleware/auth';
import { uploadMiddleware } from '../middleware/upload';
import { User } from '../models/User';
import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const router = Router();

// Verify Firebase token and sync profile
router.post('/sync-profile', async (req, res) => {
  try {
    const { token, firebaseUid, displayName, email, photoURL } = req.body;

    // Verify the Firebase token
    const decodedToken = await auth.verifyIdToken(token);
    
    if (decodedToken.uid !== firebaseUid) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Find or create user
    let user = await User.findOne({ firebaseUid });
    
    if (!user) {
      user = new User({
        firebaseUid,
        email,
        displayName,
        photoURL,
        createdAt: new Date(),
        settings: {
          theme: 'light',
          emailNotifications: true,
          pushNotifications: true
        }
      });
    } else {
      // Update user profile
      user.displayName = displayName;
      user.email = email;
      if (photoURL) {
        user.photoURL = photoURL;
      }
    }

    await user.save();

    // Generate session token
    const sessionToken = await user.generateAuthToken();

    res.json({
      token: sessionToken,
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: user.createdAt,
        settings: user.settings
      }
    });
  } catch (error) {
    console.error('Error in sync-profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Upload profile photo
router.post('/upload-photo', auth, uploadMiddleware.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const user = req.user;
    const file = req.file;

    // Upload to Firebase Storage
    const storageRef = ref(storage, `profile-photos/${user._id}/${Date.now()}_${file.originalname}`);
    const snapshot = await uploadBytes(storageRef, file.buffer);
    const photoURL = await getDownloadURL(snapshot.ref);

    // Update user profile
    user.photoURL = photoURL;
    await user.save();

    res.json({
      photoURL,
      message: 'Profile photo updated successfully'
    });
  } catch (error) {
    console.error('Error in upload-photo:', error);
    res.status(500).json({ message: 'Failed to upload profile photo' });
  }
});

// Update user settings
router.patch('/settings', auth, async (req, res) => {
  try {
    const { settings } = req.body;
    const user = req.user;

    user.settings = {
      ...user.settings,
      ...settings
    };

    await user.save();

    res.json({
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: user.createdAt,
        settings: user.settings
      }
    });
  } catch (error) {
    console.error('Error in update settings:', error);
    res.status(500).json({ message: 'Failed to update settings' });
  }
});

export default router; 