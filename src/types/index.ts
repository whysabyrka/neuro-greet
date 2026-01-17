export const OccasionType = {
  BIRTHDAY: 'День Рождения',
  NEW_YEAR: 'Новый Год',
} as const

export type OccasionType = (typeof OccasionType)[keyof typeof OccasionType]
