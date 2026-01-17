import { LANGUAGES } from '@/constants'
import { generateGreeting } from '@/services'
import { OccasionType, ToneType, type LanguageType } from '@/types'
import { useState } from 'react'
import { AppTitle } from '@/components'
import { OccasionButton } from './OccasionButton'
import { Cake, Snowflake } from 'lucide-react'

export const Content = () => {
  const [occasion, setOccasion] = useState<OccasionType>(OccasionType.BIRTHDAY)

  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<string>('')

  const [interests, setInterests] = useState<string>('')

  const [tone, setTone] = useState<ToneType>(ToneType.FRIENDLY)
  const [language, setLanguage] = useState<LanguageType>('Русский')

  const [generatedText, setGeneratedText] = useState<string>('')

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async (): Promise<void> => {
    setError('Please enter a name.')
    if (!name.trim()) return

    setError(null)
    setIsLoading(true)
    setGeneratedText('')

    try {
      const result = await generateGreeting(
        occasion,
        name,
        age,
        interests,
        tone,
        language,
      )

      setGeneratedText(result)
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unexpected error occurred.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
      <div className='max-w-7xl mx-auto'>
        <AppTitle />

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12'>
          <div className='lg:col-span-5 sm:space-y-10 space-y-8'>
            <section className='space-y-4'>
              <div className='flex justify-between items-center'>
                <h3 className='text-lg font-bold text-gray-900 flex items-center gap-2'>
                  <span className='flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs'>
                    1
                  </span>
                  Выберите праздник
                </h3>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <OccasionButton
                  label={OccasionType.BIRTHDAY}
                  icon={Cake}
                  selected={occasion === OccasionType.BIRTHDAY}
                  onClick={() => setOccasion(OccasionType.BIRTHDAY)}
                />
                <OccasionButton
                  label={OccasionType.NEW_YEAR}
                  icon={Snowflake}
                  selected={occasion === OccasionType.NEW_YEAR}
                  onClick={() => setOccasion(OccasionType.NEW_YEAR)}
                />
              </div>
            </section>
          </div>
          <div className='lg:col-span-7 h-full'></div>
        </div>

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

        <button onClick={handleGenerate} disabled={isLoading}>
          Создать магию
        </button>
      </div>
    </main>
  )
}
