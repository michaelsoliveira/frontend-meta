'use client'

import React from 'react';
import Navigation from './navigation';
import { signOut, useSession } from 'next-auth/react';
import { custodia, estatistica, inventario, planejamento, reports, resources, solutions } from './menus';

export default function Header() {
  const { data: session, status } = useSession()
  const user = session?.user
  const defaultNavigation = [
          { name: 'Dashboard', href: '/', current: false, visible: !session, subMenu: false, subMenuItems: [] },
          { name: 'Soluções', href: '#', current: false, visible: !session, subMenu: true, subMenuItems: solutions },
          { name: 'Cadastro', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: resources },
          { name: 'Inventário', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: inventario },
          { name: 'Planejamento', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: planejamento },
          { name: 'Análise de Dados', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: estatistica },
          { name: 'Cadeia de Custódia', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: custodia },
          { name: 'Relatórios', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: reports }
      ]
  
      const userNavigation = [
          { name: `Perfil (${user?.name})`, href: '#' },
          { name: 'Alterar Senha', href: '/user/change-password' },
          { name: 'Logout', href: '#', click: () => signOut({ callbackUrl: "/" }) },
      ]
  return (
    <header className='flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
      <Navigation 
        defaultNavigation={defaultNavigation}
        userNavigation={userNavigation}
      />
    </header>
  );
}
