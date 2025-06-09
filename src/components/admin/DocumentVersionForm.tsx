import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Language } from '../../api/types/languages/languages';
import { DocumentVersion } from '../../api/types/document-versions/document-versions';

interface Entity {
  id: string;
  globalTitle: string;
  categories?: string[];
}

interface DocumentVersionFormProps {
  entities: Entity[];
  languages: Language[];
  existingVersions: DocumentVersion[];
  initialData?: DocumentVersion | null;
  onSubmit: (version: DocumentVersion) => void;
  onCancel: () => void;
}

export function DocumentVersionForm({
  entities,
  languages,
  existingVersions,
  initialData,
  onSubmit,
  onCancel,
}: DocumentVersionFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DocumentVersion>({
    defaultValues: initialData || {
      id: '',
      documentId: '',
      languageId: '',
      title: '',
      description: '',
      publishedAt: new Date()
    },
  });

  // Recherche d'entité
  const [entitySearch, setEntitySearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredEntities = useMemo(() => {
    if (!entitySearch) return [];
    return entities.filter((e) =>
      e.globalTitle.toLowerCase().includes(entitySearch.toLowerCase())
    );
  }, [entitySearch, entities]);

  const selectedEntityId = watch('documentId');
  const selectedLanguage = watch('languageId');

  // Empêcher la duplication
  const isDuplicate =
    !!selectedEntityId &&
    !!selectedLanguage &&
    existingVersions.some(
      (v) =>
        v.documentId === selectedEntityId &&
        v.languageId === selectedLanguage &&
        (!initialData || v.id !== initialData.id)
    );

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit({
          ...data,
          publishedAt: data.publishedAt ? new Date() : undefined,
        });
      })}
      className="space-y-6"
    >
      {/* Recherche d'entité */}
      <div className='w-full relative'>
        <label className="block font-medium mb-1">Document *</label>
        <input
          type="text"
          className="form-input w-full"
          placeholder="Rechercher un document..."
          value={
            selectedEntityId
              ? entities.find((e) => e.id === selectedEntityId)?.globalTitle || ''
              : entitySearch
          }
          onChange={(e) => {
            setEntitySearch(e.target.value);
            setShowSuggestions(true);
            setValue('documentId', '');
          }}
          onFocus={() => setShowSuggestions(true)}
          autoComplete="off"
        />

        {/* Affichage des catégories de l'entité sélectionnée */}
        {selectedEntityId && (
          <div className="text-xs text-neutral-600 mt-1">
            Catégories :{' '}
            {(entities.find(e => e.id === selectedEntityId)?.categories || [])
              .join(', ') || <span className="text-neutral-400">Aucune</span>}
          </div>
        )}

        {showSuggestions && entitySearch && (
          <div className="border rounded bg-white shadow absolute z-10 w-full max-h-40 overflow-y-auto">
            {filteredEntities.length > 0 ? (
              filteredEntities.map((entity) => (
                <div
                  key={entity.id}
                  className="px-4 py-2 hover:bg-primary-50 cursor-pointer"
                  onClick={() => {
                    setValue('documentId', entity.id);
                    setEntitySearch(entity.globalTitle);
                    setShowSuggestions(false);
                  }}
                >
                  {entity.globalTitle}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-neutral-400">Aucun résultat</div>
            )}
          </div>
        )}
        <input type="hidden" {...register('documentId', { required: 'Document requis' })} />
        {errors.documentId && (
          <p className="text-error text-sm">{errors.documentId.message}</p>
        )}
      </div>

      {/* Langue */}
      <div>
        <label className="block font-medium mb-1">Langue *</label>
        <select
          className="form-input w-full"
          {...register('languageId', { required: 'Langue requise' })}
          defaultValue={initialData?.languageId || ''}
        >
          <option value="">Sélectionner une langue</option>
          {languages.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
        {errors.languageId && (
          <p className="text-error text-sm">{errors.languageId.message}</p>
        )}
      </div>

      {/* Champs traduits */}
      {selectedLanguage && (
        <>
          <div>
            <label className="block font-medium mb-1">Titre traduit *</label>
            <input
              className="form-input w-full"
              {...register('title', { required: 'Titre requis' })}
            />
            {errors.title && (
              <p className="text-error text-sm">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              className="form-input w-full"
              rows={3}
              {...register('description')}
            />
          </div>
          <input type="hidden" {...register('publishedAt')} />
        </>
      )}

      {/* Validation duplication */}
      {isDuplicate && (
        <div className="text-error text-sm">
          Une version existe déjà pour ce document et cette langue.
        </div>
      )}

      <div className="flex justify-end gap-4">
        <button type="button" className="btn-outline" onClick={onCancel}>
          Annuler
        </button>
        <button
          type="submit"
          className="btn-primary"
          disabled={isDuplicate}
        >
          {initialData ? 'Mettre à jour' : 'Créer'}
        </button>
      </div>
    </form>
  );
}