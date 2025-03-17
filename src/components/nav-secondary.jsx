import * as React from "react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import { Link } from "react-router-dom";

export function NavSecondary({
  items,
  ...props
}) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              
                <Dialog>
                  <DialogTrigger className="w-full">
                  <div className='cursor-pointer peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0'>
                  <item.icon />
                  <span>{item.title}</span>
                  </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>
                      Najczęśćiej zadawane pytania
                    </DialogTitle>
                    <DialogHeader>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="poco" className='bg-(--dominant) rounded-md p-2 mb-2'>
                        <AccordionTrigger>Po co jest swimply?</AccordionTrigger>
                        <AccordionContent className="AccordionContent">
                          Żeby sobie fajnie staty podejrzec z treningow i sobie trackowac treningi plywania
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="ktoto" className='bg-(--dominant) rounded-md p-2 mb-2'>
                        <AccordionTrigger>Kto to napisal?</AccordionTrigger>
                        <AccordionContent className="AccordionContent">
                         Oczywiscie napisal to macius z mala pomoca kleksa wiktora
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="ktora" className='bg-(--dominant) rounded-md p-2'>
                        <AccordionTrigger>Ktora jest godzina?</AccordionTrigger>
                        <AccordionContent className="AccordionContent">
                          Jak chcesz sprawdzic godzine to tu <a className="bg-gray-600 text-black rounded-sm" href="http://zegarek123.netlify.app">zegarek123</a>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
