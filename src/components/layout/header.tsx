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
          { name: `Perfil (${user?.username})`, href: '#' },
          { name: 'Alterar Senha', href: '/user/change-password' },
          { name: 'Logout', href: '#', click: () => signOut({ callbackUrl: "/" }) },
      ]
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow">
      <Navigation 
        defaultNavigation={defaultNavigation}
        userNavigation={userNavigation}
      />
    </header>
  );
}
