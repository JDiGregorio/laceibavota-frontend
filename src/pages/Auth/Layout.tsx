import { ComponentType } from 'react'
import { Link } from 'react-router-dom'

// import wvLogo from '@/assets/wv-logo.png'
import voting from '@/assets/voting.svg'

export const withLayout = (WrappedComponent: ComponentType, title: string) => {
	return () => {
		return (
			<div className="flex h-lvh min-h-full flex-1">
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <Link to="/" className="inline-flex items-center border border-indigo-300 px-3 py-1.5 rounded-md text-indigo-500 hover:bg-indigo-50">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18">
                                    </path>
                                </svg>
                                <span className="ml-1 font-bold text-lg">Back</span>
                            </Link>
                        
							<h2 className="mt-8 text-2xl font-semibold leading-9 tracking-tight text-gray-900">
								{title}
							</h2>
						</div>

                        <div className="mt-10">
							<WrappedComponent />
                        </div>
                    </div>
                </div>

                <div className="relative hidden w-0 flex-1 lg:block">
                    <img className="absolute inset-0 h-full w-full  shadow-inner" src={voting} alt="Wallpaper" />
                </div>
            </div>
		)
	}
}