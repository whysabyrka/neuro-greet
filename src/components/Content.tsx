import { OccasionType } from '@/types'
import { useState } from 'react'

export const Content = () => {
  const [occasion, setOccasion] = useState<OccasionType>(OccasionType.BIRTHDAY)

  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<string>('')

  const [interests, setInterests] = useState<string>('')

  return (
    <main className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
      <div className='max-w-7xl mx-auto'>
        <button onClick={() => setOccasion(OccasionType.BIRTHDAY)}>
          День Рождения
        </button>
        <button onClick={() => setOccasion(OccasionType.NEW_YEAR)}>
          Новый Год
        </button>

        <input
          type='text'
          value={name}
          placeholder='Юля'
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          value={age}
          placeholder='18'
          onChange={(e) => setAge(e.target.value)}
        />

        <textarea
          rows={2}
          value={interests}
          placeholder='Путешествия, кодинг, котики'
          onChange={(e) => setInterests(e.target.value)}
        ></textarea>
      </div>
    </main>
  )
}
