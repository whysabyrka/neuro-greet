export const OccasionType = {
  BIRTHDAY: 'День Рождения',
  NEW_YEAR: 'Новый Год',
} as const

export type OccasionType = (typeof OccasionType)[keyof typeof OccasionType]

export const ToneType = {
  OFFICIAL: 'Официальный',
  FRIENDLY: 'Дружеский',
  HUMOROUS: 'Юмористический',
  ROMANTIC: 'Романтический',
  TOUCHING: 'Трогательный',
  ADULT: '18+',
} as const

export type ToneType = (typeof ToneType)[keyof typeof ToneType]

export type LanguageType =
  | 'Русский'
  | 'Белорусский'
  | 'English'
  | 'Deutsch'
  | 'Español'
  | 'Français'
