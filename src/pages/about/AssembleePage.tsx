import PageHeader from "../../components/ui/PageHeader";
import Section from "../../components/ui/Section";
import { useTranslation } from "../../hooks/useTranslation";
import { mockAdminAboutSections } from "../../lib/mockAdminData";
import { useLanguageStore } from "../../stores/useUILanguageStore";

const AssembleePage = () => {
  const { currentLanguage } = useLanguageStore();
  const { t } = useTranslation();

  const assembleeSections = mockAdminAboutSections
    .filter(section => section.entity === 'assemblee' && !section.isIntro)
    .map(section => ({
      ...section,
      title: section.translations.find(value => value.lang === currentLanguage)?.title || section.translations.find(value => value.lang === 'fr')?.title,
      shortDescription: section.translations.find(value => value.lang === currentLanguage)?.description || section.translations.find(value => value.lang === 'fr')?.description
    }))
    .sort((a, b) => a.order - b.order);

  return (
    <div>
      <PageHeader 
        title="L'Assemblée" 
        subtitle="Découvrez notre assemblée locale"
        backgroundImage="https://images.pexels.com/photos/2425232/pexels-photo-2425232.jpeg"
      />
      
      <div className="container mx-auto px-4 py-12">
        {assembleeSections.map((section) => (
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
  // informations en rapport avec l'assemblée
};

export default AssembleePage