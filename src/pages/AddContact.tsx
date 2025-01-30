import React, { useState } from 'react';
import { UserPlus, Trash2 } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  phone: string;
  priority: number;
}

const AddContact = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    priority: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const contact: Contact = {
      id: Date.now().toString(),
      ...newContact
    };
    setContacts([...contacts, contact]);
    setNewContact({ name: '', phone: '', priority: 1 });
  };

  const handleDelete = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 text-center mb-6">
          Emergency Contacts
        </h1>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                value={newContact.name}
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                value={newContact.phone}
                onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                value={newContact.priority}
                onChange={(e) => setNewContact({...newContact, priority: parseInt(e.target.value)})}
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Center the button using flex and justify-center */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              <UserPlus className="h-5 w-5" />
              <span>Add Contact</span>
            </button>
          </div>
        </form>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-pink-800">Contact List</h2>
          {contacts.length === 0 ? (
            <p className="text-gray-500">No contacts added yet.</p>
          ) : (
            <div className="grid gap-4">
              {contacts
                .sort((a, b) => a.priority - b.priority)
                .map(contact => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between bg-pink-50 p-4 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium text-pink-800">{contact.name}</h3>
                      <p className="text-gray-600">{contact.phone}</p>
                      <span className="text-sm text-pink-600">Priority: {contact.priority}</span>
                    </div>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddContact;
