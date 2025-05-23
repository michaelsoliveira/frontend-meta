'use client'

import { createRef, Fragment, SVGProps, useCallback, useContext, useEffect, useState, forwardRef, JSX, } from 'react'
import { Disclosure, Menu, Transition, Popover } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, ChevronUpIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Logo from '../logo'
import { Link } from '../link'
import { MenuIcon, XIcon } from 'lucide-react'

type SubMenuType = {
        name?: string,
        description?: string,
        href?: string,
        subMenuItems?: SubMenuType[],
        icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element
        faIcon?: boolean;
    }
    type NavigationType = {
        name: string,
        href: string,
        current: boolean,
        visible: boolean,
        subMenu: boolean,
        subMenuItems?: SubMenuType[]
    }

export default function Navigation({ defaultNavigation, userNavigation }: any) {
    const { data: session } = useSession() as any
    const pathname = usePathname()
    const [ menuOpened, setMenuOpened ] = useState(false)
    const animation = false

    const [navigation, setNavigation] = useState<NavigationType[]>(defaultNavigation)
    const [sticky, setSticky] = useState(false)

    const handleScroll = () => {
        if (scrollY > 72) {
          setSticky(true);
        } else if (scrollY < 72) {
          setSticky(false);
        }
    }

    useEffect(() => {
        addEventListener('scroll', handleScroll)

        return () => {
            removeEventListener('scroll', handleScroll)
        }
    }, [])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const changeCurrentParent = useCallback((key: any, href?: string) =>  {        
        const changeCurrentNav = defaultNavigation.map((nav: any, index: any) => {
            if (key !== index) {
                return {
                    ...nav,
                    current: false
                }
            } else {
                return {
                    ...nav,
                    current: true
                }
            }
            
        })
        
        setNavigation(changeCurrentNav)
        //if (href) router.push(href)
    }, [defaultNavigation])

    const checkCurrentNavigation = useCallback(() => {
            defaultNavigation?.map((nav: NavigationType, indexParent: number) => {
                if (nav?.subMenuItems) {
                    if (pathname === nav.href) {
                        return changeCurrentParent(indexParent)
                    }
                    nav?.subMenuItems?.map((subMenu: SubMenuType, indexSub: number) => {
                        if (pathname === subMenu.href) {
                            return changeCurrentParent(indexParent)
                        }

                        subMenu.subMenuItems?.map((subsubMenu: SubMenuType, indexSubsub: number) => {
                            if (pathname === subsubMenu.href) {
                                return changeCurrentParent(indexParent)
                            }
                        })
                    })
                }
            })
        
    }, [changeCurrentParent, defaultNavigation, pathname])

    const loadNavigation = useCallback(async() => {
        if (session) {
            checkCurrentNavigation()
        }
    }, [checkCurrentNavigation, session]) 
    

    useEffect(() => {
        let isLoaded = false
        if (!isLoaded)
            loadNavigation()

        return () => {
            isLoaded = true
        }

    }, [loadNavigation])

    return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <span className="text-xl font-bold text-green-700">MinhaLogo</span>
                </Link>
              </div>

              {/* Menu Desktop */}
              <div className="hidden md:flex md:items-center md:space-x-4 w-full">
                {navigation.map((item) =>
                  !item.subMenu ? (
                    <Link key={item.name} href={item.href}>
                      <span className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium">
                        {item.name}
                      </span>
                    </Link>
                  ) : (
                    <Popover key={item.name} className="relative">
                      {({ open }) => (
                        <>
                          <Popover.Button className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium inline-flex items-center">
                            {item.name}
                            <ChevronDownIcon
                              className={`ml-1 h-4 w-4 transition-transform ${
                                open ? 'transform rotate-180' : ''
                              }`}
                              aria-hidden="true"
                            />
                          </Popover.Button>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel className="absolute z-10 mt-2 w-48 bg-white shadow-lg rounded-md">
                              <div className="py-1">
                                {item.subMenuItems?.map((subItem: any) => (
                                  <Link key={subItem.name} href={subItem.href}>
                                    <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                      {subItem.name}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  )
                )}
              </div>

              {/* Botão Mobile */}
              <div className="flex items-center md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-700 focus:outline-none">
                  <span className="sr-only">Abrir menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Menu Mobile */}
          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) =>
                !item.subMenu ? (
                  <Link key={item.name} href={item.href}>
                    <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-100">
                      {item.name}
                    </span>
                  </Link>
                ) : (
                  <Disclosure key={item.name} as="div" className="space-y-1">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="w-full flex items-center justify-between px-3 py-2 text-left text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-100 rounded-md">
                          <span>{item.name}</span>
                          <ChevronDownIcon
                            className={`ml-2 h-5 w-5 transition-transform ${
                              open ? 'transform rotate-180' : ''
                            }`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="space-y-1 pl-5">
                          {item.subMenuItems?.map((subItem: any) => (
                            <Link key={subItem.name} href={subItem.href}>
                              <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-100">
                                {subItem.name}
                              </span>
                            </Link>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                )
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
