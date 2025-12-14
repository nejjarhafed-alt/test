import React, { useState, useEffect } from 'react';
import { getDocuments, addDocument, updateDocument, deleteDocument, getStats } from '../services/storageService';
import { Document, Category, Source } from '../types';
import { Trash2, Plus, Edit2, Link as LinkIcon, X, Search, FileText, Users, Download, BarChart3, Settings } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [stats, setStats] = useState({ visitors: 0, downloads: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>(Category.MATHS);
  const [source, setSource] = useState<Source>(Source.ECT);
  const [year, setYear] = useState(new Date().getFullYear());
  const [url, setUrl] = useState('');

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setDocuments(getDocuments());
    setStats(getStats());
  };

  // Logic to enforce subject/source constraints
  // Rule: Maths is ONLY for ECT. Gestion is for ECT and ECS.
  useEffect(() => {
    if (category === Category.MATHS) {
      setSource(Source.ECT);
    }
  }, [category]);

  const openAddModal = () => {
    setEditingDoc(null);
    setTitle('');
    setCategory(Category.MATHS);
    setSource(Source.ECT);
    setYear(new Date().getFullYear());
    setUrl('');
    setIsModalOpen(true);
  };

  const openEditModal = (doc: Document) => {
    setEditingDoc(doc);
    setTitle(doc.title);
    setCategory(doc.category);
    setSource(doc.source);
    setYear(doc.year);
    setUrl(doc.url);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    if (year < 2012 || year > 2025) {
      alert("L'année doit être comprise entre 2012 et 2025.");
      return;
    }

    if (editingDoc) {
      updateDocument(editingDoc.id, { title, category, source, year, url });
    } else {
      addDocument({ title, category, source, year, url, addedBy: 'Admin' });
    }

    setIsModalOpen(false);
    refreshData();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Supprimer ce document définitivement ?')) {
      deleteDocument(id);
      refreshData();
    }
  };

  const filteredDocs = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
               <h1 className="text-4xl font-serif font-bold text-iscae-dark">Tableau de Bord</h1>
               <p className="text-gray-500 mt-2 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                 Système actif • Connecté en tant qu'Administrateur
               </p>
            </div>
            <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm flex gap-2">
                <button className="p-2 text-gray-400 hover:text-iscae-blue transition-colors"><Settings className="w-5 h-5" /></button>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg shadow-blue-900/20 transform hover:-translate-y-1 transition-transform">
               <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-white/20 rounded-lg"><Users className="w-6 h-6" /></div>
                  <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded">+12%</span>
               </div>
               <p className="text-blue-100 text-sm font-medium">Visiteurs Totaux</p>
               <h3 className="text-3xl font-bold mt-1">{stats.visitors.toLocaleString()}</h3>
            </div>

            <div className="bg-gradient-to-br from-iscae-gold to-yellow-600 rounded-2xl p-6 text-white shadow-lg shadow-yellow-900/20 transform hover:-translate-y-1 transition-transform">
               <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-white/20 rounded-lg"><Download className="w-6 h-6" /></div>
                  <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded text-white">Actif</span>
               </div>
               <p className="text-yellow-100 text-sm font-medium">Téléchargements</p>
               <h3 className="text-3xl font-bold mt-1">{stats.downloads.toLocaleString()}</h3>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow md:col-span-2 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Base de Connaissances</h3>
                  <p className="text-gray-500 text-sm">{documents.length} annales disponibles pour les étudiants.</p>
                </div>
                <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                  <BarChart3 className="w-8 h-8" />
                </div>
            </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            {/* Toolbar */}
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/30">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                   <FileText className="w-5 h-5 text-iscae-blue" />
                   Gestion des Documents
                </h2>
                
                <div className="flex w-full md:w-auto gap-3">
                    <div className="relative flex-grow md:flex-grow-0 group">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-focus-within:text-iscae-blue transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Rechercher..." 
                            className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-iscae-blue/20 focus:border-iscae-blue outline-none text-sm transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={openAddModal}
                        className="flex items-center px-5 py-2 bg-iscae-blue text-white rounded-lg hover:bg-iscae-dark hover:shadow-lg transition-all text-sm font-bold"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Nouveau
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase text-gray-500 font-bold tracking-wider">
                        <th className="px-8 py-5">Document</th>
                        <th className="px-6 py-5">Catégorie</th>
                        <th className="px-6 py-5">Source</th>
                        <th className="px-6 py-5 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {filteredDocs.length === 0 ? (
                        <tr>
                           <td colSpan={4} className="px-8 py-12 text-center text-gray-400">
                              Aucun résultat trouvé.
                           </td>
                        </tr>
                    ) : (
                        filteredDocs.map(doc => (
                        <tr key={doc.id} className="hover:bg-blue-50/30 transition-colors group">
                            <td className="px-8 py-4">
                                <div className="font-semibold text-gray-800">{doc.title}</div>
                                <div className="text-xs text-gray-400 mt-1">{doc.year} • Ajouté par {doc.addedBy}</div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${doc.category === Category.MATHS ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-orange-100 text-orange-700 border-orange-200'}`}>
                                    {doc.category}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-sm text-gray-600 font-medium">{doc.source}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => openEditModal(doc)}
                                        className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                        title="Modifier"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(doc.id)}
                                        className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                        title="Supprimer"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        ))
                    )}
                </tbody>
                </table>
            </div>
        </div>
      </div>

      {/* Modern Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative flex flex-col max-h-[90vh] overflow-hidden animate-slide-up">
            
            <div className="px-8 py-6 bg-iscae-blue flex justify-between items-center">
               <h2 className="text-xl font-serif font-bold text-white flex items-center gap-3">
                 {editingDoc ? <Edit2 className="w-5 h-5 text-iscae-gold" /> : <Plus className="w-5 h-5 text-iscae-gold" />}
                 {editingDoc ? 'Modifier l\'annale' : 'Ajouter une annale'}
               </h2>
               <button onClick={() => setIsModalOpen(false)} className="text-white/60 hover:text-white transition-colors">
                 <X className="w-6 h-6" />
               </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 overflow-y-auto custom-scrollbar">
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Titre du document</label>
                        <input 
                            required
                            type="text" 
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-iscae-blue focus:bg-white outline-none transition-all font-medium"
                            placeholder="Ex: Épreuve de Mathématiques 2023..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Matière</label>
                            <select 
                                value={category}
                                onChange={e => setCategory(e.target.value as Category)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-iscae-blue"
                            >
                                <option value={Category.MATHS}>{Category.MATHS}</option>
                                <option value={Category.GESTION}>{Category.GESTION}</option>
                            </select>
                            <p className="text-[10px] text-gray-400 mt-1 ml-1">
                                {category === Category.MATHS ? 'Réservé aux ECT uniquement.' : 'Accessible ECT et ECS.'}
                            </p>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Année (2012-2025)</label>
                            <input 
                                type="number" 
                                min="2012"
                                max="2025"
                                value={year}
                                onChange={e => setYear(Number(e.target.value))}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-iscae-blue"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Filière (Prépa)</label>
                        <div className="grid grid-cols-2 gap-4">
                            {Object.values(Source).map((s) => {
                                // Logic: If Category is MATHS, disable ECS.
                                const isDisabled = category === Category.MATHS && s === Source.ECS;
                                
                                return (
                                <label key={s} className={`
                                    relative flex items-center justify-center px-4 py-4 border rounded-xl transition-all
                                    ${source === s ? 'bg-blue-50 border-iscae-blue text-iscae-blue shadow-sm' : 'border-gray-100 text-gray-600'}
                                    ${isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'cursor-pointer hover:border-gray-300'}
                                `}>
                                    <input 
                                        type="radio" 
                                        name="source" 
                                        value={s} 
                                        checked={source === s}
                                        onChange={() => setSource(s)}
                                        disabled={isDisabled}
                                        className="sr-only"
                                    />
                                    <span className="font-bold text-sm">{s}</span>
                                    {source === s && <div className="absolute top-2 right-2 w-2 h-2 bg-iscae-blue rounded-full"></div>}
                                </label>
                            )})}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Lien URL (Google Drive, Dropbox...)</label>
                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-iscae-blue transition-all">
                            <div className="pl-4 text-gray-400"><LinkIcon className="w-5 h-5" /></div>
                            <input 
                                required
                                type="url" 
                                value={url}
                                onChange={e => setUrl(e.target.value)}
                                className="flex-1 px-4 py-3 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-4">
                    <button 
                        type="button" 
                        onClick={() => setIsModalOpen(false)}
                        className="px-6 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        Annuler
                    </button>
                    <button 
                        type="submit" 
                        className="px-8 py-3 bg-iscae-blue text-white font-bold rounded-xl hover:bg-iscae-dark hover:shadow-lg transition-all"
                    >
                        {editingDoc ? 'Sauvegarder' : 'Ajouter le document'}
                    </button>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;