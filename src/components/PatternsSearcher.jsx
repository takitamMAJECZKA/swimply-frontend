"use client"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

const statuses = [
  {label: 'Żabka', value: 'Zabka'},
  {label: 'Kraul', value: 'Kraul'},
  {label: 'Motylek', value: 'Motylek'},
  {label: 'Grzbiet', value: 'Grzbiet'},
  {label: 'Żabka niekryta', value: 'Zabka niekryta'},
  {label: 'Kraul ratowniczy', value: 'Kraul ratowniczy'},
]

export default function PatternsSearcher({
  setOpen,
  setSelectedStatus,
}) {
  return (
    <Command>
      <CommandInput placeholder="Wyszukaj..." />
      <CommandList>
        <CommandEmpty>Nie znaleziono</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedStatus(
                  statuses.find((priority) => priority.value === value) || null
                )
                setOpen(false)
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
