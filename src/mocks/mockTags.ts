import { LanguageEnum, Tag, TagSummary } from "../types/api";

export const mockTagSummaries: TagSummary[] = [
    { id: 'tag1', title: 'Faith' },
    { id: 'tag2', title: 'Blessing' },
    { id: 'tag3', title: 'Prayer' },
    { id: 'tag4', title: 'Community' },
    { id: 'tag5', title: 'Worship' }
];

export const mockTags: Tag[] = [
    {
        id: 'tag1',
        createdAt: new Date('2024-01-01T10:00:00Z'),
        updatedAt: new Date('2024-06-01T12:00:00Z'),
        translations: [
            { language: LanguageEnum.en, title: 'Faith' },
            { language: LanguageEnum.fr, title: 'Foi' },
            { language: LanguageEnum.es, title: 'Fe' }
        ]
    },
    {
        id: 'tag2',
        createdAt: new Date('2024-02-10T09:30:00Z'),
        updatedAt: new Date('2024-06-02T13:00:00Z'),
        translations: [
            { language: LanguageEnum.en, title: 'Blessing' },
            { language: LanguageEnum.fr, title: 'Bénédiction' }
        ]
    },
    {
        id: 'tag3',
        createdAt: new Date('2024-03-15T11:15:00Z'),
        updatedAt: new Date('2024-06-03T14:00:00Z'),
        translations: [
            { language: LanguageEnum.en, title: 'Prayer' },
            { language: LanguageEnum.es, title: 'Oración' }
        ]
    },
    {
        id: 'tag4',
        createdAt: new Date('2024-04-20T08:45:00Z'),
        updatedAt: new Date('2024-06-04T15:00:00Z'),
        translations: [
            { language: LanguageEnum.en, title: 'Community' },
            { language: LanguageEnum.fr, title: 'Communauté' },
            { language: LanguageEnum.es, title: 'Comunidad' }
        ]
    },
    {
        id: 'tag5',
        createdAt: new Date('2024-05-05T14:20:00Z'),
        updatedAt: new Date('2024-06-05T16:00:00Z'),
        translations: [
            { language: LanguageEnum.en, title: 'Worship' }
        ]
    }
];