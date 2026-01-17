import { generateGreeting } from '@/services'
import { OccasionType, ToneType, type LanguageType } from '@/types'
import { useState } from 'react'
import {
  AppTitle,
  ExtraDetailsSection,
  GenerateButton,
  OccasionButton,
  ResultSection,
  UserDetailsSection,
} from '@/components'
import { Cake, Snowflake, Sparkles } from 'lucide-react'

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

  const [isImageEnabled, setIsImageEnabled] = useState<boolean>(false)

  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null,
  )

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

            <UserDetailsSection
              name={name}
              age={age}
              error={error}
              setName={setName}
              interests={interests}
              setAge={setAge}
              setError={setError}
              setInterests={setInterests}
            />

            <ExtraDetailsSection
              error={error}
              language={language}
              selectedTone={tone}
              isImageEnabled={isImageEnabled}
              setTone={setTone}
              setLanguage={setLanguage}
              setIsImageEnabled={setIsImageEnabled}
            />

            <GenerateButton isLoading={isLoading} onClick={handleGenerate}>
              <Sparkles
                className={`w-5 h-5 ${isLoading ? 'animate-spin' : 'group-hover:animate-pulse'}`}
              />
              {isLoading ? 'Сочиняем...' : 'Сгенерировать'}
            </GenerateButton>
          </div>

          <div className='lg:col-span-7 h-full'>
            <ResultSection
              content={generatedText}
              isLoading={isLoading}
              imageUrl={generatedImageUrl}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
