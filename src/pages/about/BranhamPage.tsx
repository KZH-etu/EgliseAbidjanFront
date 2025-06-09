import PageHeader from "../../components/ui/PageHeader";
import Section from "../../components/ui/Section";
import { useTranslation } from "../../hooks/useTranslation";
import { mockAdminAboutSections } from "../../lib/mockAdminData";
import { useLanguageStore } from "../../stores/useUILanguageStore";

const BranhamPage = () => {
  const { currentLanguage } = useLanguageStore();
  const { t } = useTranslation();

  const branhamSections = mockAdminAboutSections
    .filter(section => section.entity === 'branham' && !section.isIntro)
    .map(section => ({
      ...section,
      title: section.translations.find(value => value.lang === currentLanguage)?.title || section.translations.find(value => value.lang === 'fr')?.title,
      shortDescription: section.translations.find(value => value.lang === currentLanguage)?.description || section.translations.find(value => value.lang === 'fr')?.description
    }))
    .sort((a, b) => a.order - b.order);

  return (
    <div>
      <PageHeader 
        title="William Marrion Branham" 
        subtitle="Découvrez le ministère de William Marrion Branham"
        backgroundImage="https://images.pexels.com/photos/2635393/pexels-photo-2635393.jpeg"
      />
      
      <div className="container mx-auto px-4 py-12">
        {branhamSections.map((section) => (
          <Section
            key={section.id}
            title={section.title}
            shortDescription={section.shortDescription ? section.shortDescription : ''}
            mainImage={section.mainImage}
            links={section.links}
          />
        ))}
      </div>
    </div>
  );
};

export default BranhamPage