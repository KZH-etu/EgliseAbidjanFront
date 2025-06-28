import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useMediaLibrary } from "../hooks/useMediaLibrary";
import { useRelatedMediaCards } from "../hooks/useRelatedMediaCards";
import { MediaLibraryItemView } from "../types/api";
import MainItemView from "../components/mediaLibrary/MainItemView";
import MediaCardComponent from "../components/mediaLibrary/MediaCard";
import { ArrowLeft, Globe } from "lucide-react";
import { LoadingSpinner } from "../components/ui/LoadingSpinner/LoadingSpinner";

export default function LibraryItemViewPage() {
  const { docId, langId, type } = useParams<{ docId: string; langId: string; type: "audio" | "video" | "text" }>();
  const { fetchView, loading, error } = useMediaLibrary();
  const [view, setView] = useState<MediaLibraryItemView | null>(null);

  // Fetch related media cards
  const { relatedCards, loading: relatedLoading } = useRelatedMediaCards(view?.relatedItems || []);

  useEffect(() => {
    if (docId && langId && type) {
      fetchView(docId, langId, type)
        .then(setView)
        .catch(console.error);
    }
  }, [docId, langId, type, fetchView]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">Erreur</h2>
          <p className="text-neutral-600 mb-6">{error}</p>
          <Link to="/library" className="btn-primary">
            Retour à la médiathèque
          </Link>
        </div>
      </div>
    );
  }

  if (!view) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">Contenu non trouvé</h2>
          <p className="text-neutral-600 mb-6">Le contenu demandé n'existe pas ou n'est plus disponible.</p>
          <Link to="/library" className="btn-primary">
            Retour à la médiathèque
          </Link>
        </div>
      </div>
    );
  }

  if (!type) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">Type de média non spécifié</h2>
          <p className="text-neutral-600 mb-6">Le type de média n'a pas pu être déterminé.</p>
          <Link to="/library" className="btn-primary">
            Retour à la médiathèque
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            <Link 
              to={`/library/${type}`}
              className="flex items-center text-neutral-600 hover:text-neutral-800 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Retour à la médiathèque
            </Link>

            {/* Language selector */}
            {view.availableLanguages && view.availableLanguages.length > 1 && (
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-neutral-500" />
                <select 
                  value={langId}
                  onChange={(e) => {
                    const newLangId = e.target.value;
                    window.location.href = `/library/view/${docId}/${newLangId}/${type}`;
                  }}
                  className="form-select text-sm"
                >
                  {view.availableLanguages.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Item View */}
          <MainItemView type={type} data={view} />

          {/* Related Items */}
          {relatedCards.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-6">Contenus similaires</h2>
              
              {relatedLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedCards.map((card) => (
                    <MediaCardComponent
                      key={card.id}
                      card={card}
                      variant="basic"
                      onClick={() => {
                        // Navigate to the related item
                        window.location.href = `/library/view/${card.id}/${card.language.id}/${type}`;
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}