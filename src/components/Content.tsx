import { LANGUAGES } from '@/constants'
import { generateGreeting } from '@/services/gemini'
import { OccasionType, ToneType, type LanguageType } from '@/types'
import { useState } from 'react'

export const Content = () => {
  const [occasion, setOccasion] = useState<OccasionType>(OccasionType.BIRTHDAY)

  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<string>('')

  const [interests, setInterests] = useState<string>('')

  const [tone, setTone] = useState<ToneType>(ToneType.FRIENDLY)
  const [language, setLanguage] = useState<LanguageType>('Русский')

  const [generateText, setGenerateText] = useState<string>('')

  const handleGenerate = async (): Promise<void> => {
    if (!name.trim()) return

    try {
      const result = await generateGreeting(
        occasion,
        name,
        age,
        interests,
        tone,
        language,
      )

      setGenerateText(result)
    } catch (error) {
      console.error('Error in handleGenerate:', error)
    }
  }

  return (
    <main className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
      <div className='max-w-7xl mx-auto'>
        <button onClick={() => setOccasion(OccasionType.BIRTHDAY)}>
          День Рождения
        </button>
        <button onClick={() => setOccasion(OccasionType.NEW_YEAR)}>
          Новый Год
        </button>

        <br />
        <br />

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

        <br />
        <br />

        <textarea
          rows={2}
          value={interests}
          placeholder='Путешествия, кодинг, котики'
          onChange={(e) => setInterests(e.target.value)}
        ></textarea>

        <br />
        <br />

        {Object.values(ToneType).map((tone) => (
          <button key={tone} onClick={() => setTone(tone)}>
            {tone}
          </button>
        ))}

        <br />
        <br />

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as LanguageType)}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        <br />
        <br />

        <button onClick={handleGenerate}>Создать магию</button>
      </div>
    </main>
  )
}
