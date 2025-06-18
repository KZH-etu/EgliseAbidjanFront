import { motion } from 'framer-motion';
import { Link, useNavigate} from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { useTranslation } from '../hooks/useTranslation';
import { mockAdminAboutSections } from '../mocks/mockAdminData';
import { useLanguageStore } from '../stores/useUILanguageStore';

const AboutPage = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguageStore();
  const { t } = useTranslation();

  const assembleeSections = mockAdminAboutSections
    .filter(section => section.entity === 'assemblee' && section.isIntro)
    .map(section => ({
      ...section,
      title: section.translations.find(value => value.lang === currentLanguage)?.title || section.translations.find(value => value.lang === 'fr')?.title,
      shortDescription: section.translations.find(value => value.lang === currentLanguage)?.description || section.translations.find(value => value.lang === 'fr')?.description
    }));

    const branhamSections = mockAdminAboutSections
    .filter(section => section.entity === 'branham' && section.isIntro)
    .map(section => ({
      ...section,
      title: section.translations.find(value => value.lang === currentLanguage)?.title || section.translations.find(value => value.lang === 'fr')?.title,
      shortDescription: section.translations.find(value => value.lang === currentLanguage)?.description || section.translations.find(value => value.lang === 'fr')?.description
    }));

  const frankSections = mockAdminAboutSections
    .filter(section => section.entity === 'frank' && section.isIntro)
    .map(section => ({
      ...section,
      title: section.translations.find(value => value.lang === currentLanguage)?.title || section.translations.find(value => value.lang === 'fr')?.title,
      shortDescription: section.translations.find(value => value.lang === currentLanguage)?.description || section.translations.find(value => value.lang === 'fr')?.description
    }));

  return (
    <div>
      <PageHeader 
        title={t('nav.about')}
        subtitle={t('about.subtitle')}
        backgroundImage="https://images.pexels.com/photos/372326/pexels-photo-372326.jpeg"
      />

      {/* L'Assemblée d'Abidjan Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {assembleeSections.map((section) => (
                <div key={section.id}>
                  <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
                  <div className="text-lg text-neutral-600">
                    {Array.isArray(section.shortDescription) ? (
                      section.shortDescription.map((paragraph, index) => (
                        <p key={index} className="mb-6">{paragraph}</p>
                      ))
                    ) : (
                      <p className="mb-6">{section.shortDescription}</p>
                    )}
                    <div className="flex gap-4 mb-8">
                      <Link to="/contact" className="btn-primary inline-flex items-center">
                        {t('nav.contact')}
                        <ChevronRight size={20} className="ml-2" />
                      </Link>
                      <Link to="/about/assemblee" className="btn-outline inline-flex items-center">
                        {t('common.readMore')}
                        <ChevronRight size={20} className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
            
            {assembleeSections[0]?.mainImage && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <img 
                  src={assembleeSections[0].mainImage}
                  alt={t('about.assemblee.imageAlt')}
                  className="rounded-lg shadow-xl w-full"
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Ewald Frank Section */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {frankSections[0]?.mainImage && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1"
              >
                <img 
                  src={frankSections[0].mainImage}
                  alt={t('about.frank.imageAlt')}
                  className="rounded-lg shadow-xl w-full"
                />
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              {frankSections.map((section) => (
                <div key={section.id}>
                  <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
                  <div className="text-lg text-neutral-600">
                    {Array.isArray(section.shortDescription) ? (
                      section.shortDescription.map((paragraph, index) => (
                        <p key={index} className="mb-6">{paragraph}</p>
                      ))
                    ) : (
                      <p className="mb-6">{section.shortDescription}</p>
                    )}
                    <div className="flex gap-4 mb-8">
                      <button onClick={() => navigate(`/audio`)} className="btn-primary inline-flex items-center">
                        {t('about.listenMessages')}
                        <ChevronRight size={20} className="ml-2"/>
                      </button>
                      <Link to="/about/frank" className="btn-outline inline-flex items-center">
                        {t('common.readMore')}
                        <ChevronRight size={20} className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* William Branham Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {branhamSections.map((section) => (
                <div key={section.id}>
                  <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
                  <div className="text-lg text-neutral-600">
                    {Array.isArray(section.shortDescription) ? (
                      section.shortDescription.map((paragraph, index) => (
                        <p key={index} className="mb-6">{paragraph}</p>
                      ))
                    ) : (
                      <p className="mb-6">{section.shortDescription}</p>
                    )}
                    <div className="flex gap-4 mb-8">
                      <Link to="/sermons" className="btn-primary inline-flex items-center">
                        {t('about.discoverMessage')}
                        <ChevronRight size={20} className="ml-2" />
                      </Link>
                      <Link to="/about/branham" className="btn-outline inline-flex items-center">
                        {t('common.readMore')}
                        <ChevronRight size={20} className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
            
            {branhamSections[0]?.mainImage && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src={branhamSections[0].mainImage}
                  alt={t('about.branham.imageAlt')}
                  className="rounded-lg shadow-xl w-full"
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;