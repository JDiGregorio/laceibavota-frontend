import { ComponentType } from 'react'

// import wvLogo from '@/assets/wv-logo.png'
// import bgSplash from '@/assets/background-login.jpg'

export const withLayout = (WrappedComponent: ComponentType, title: string) => {
	return () => {
		return (
			<div className="flex h-lvh min-h-full flex-1">
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            {/*<img className="h-28 w-auto" src={wvLogo} alt="Logo Vision Mundial" />*/}
                        
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
                    {/*<img className="absolute inset-0 h-full w-full object-cover shadow-inner" src={bgSplash} alt="Wallpaper WVH" />*/}
                </div>
            </div>
		)
	}
}