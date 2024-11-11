import React from 'react';
import { Layout } from 'lucide-react';
import { Template } from '../types';

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
}

export default function TemplateSelector({ templates, selectedTemplate, onSelect }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Layout size={20} />
        <h2 className="text-xl font-semibold">Choose Template</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={`p-4 border rounded-lg transition-all ${
              selectedTemplate === template.id
                ? 'border-purple-500 ring-2 ring-purple-200'
                : 'border-gray-200 hover:border-purple-200'
            }`}
          >
            <img
              src={template.preview}
              alt={template.name}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <p className="text-sm font-medium text-center">{template.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}