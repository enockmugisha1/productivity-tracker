import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useCurrency } from '../context/CurrencyContext';

interface AddTransactionProps {
  onClose: () => void;
  onAdd: (transaction: {
    amount: number;
    category: string;
    description: string;
    type: 'income' | 'expense';
  }) => void;
}

const PREDEFINED_CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investments', 'Gifts', 'Other'],
  expense: ['Food', 'Transportation', 'Housing', 'Utilities', 'Entertainment', 'Shopping', 'Healthcare', 'Education', 'Other']
};

const AddTransaction: React.FC<AddTransactionProps> = ({ onClose, onAdd }) => {
  const { currency } = useCurrency();
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    type: 'expense' as 'income' | 'expense'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      amount: parseFloat(formData.amount)
    });
    onClose();
  };

  // ... rest of the component ...
}; 