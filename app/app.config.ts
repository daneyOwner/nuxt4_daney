export default defineAppConfig({
    ui: {
        tooltip: {
            slots: {
                content: "bg-black text-white ring-1 ring-black",
                arrow: "fill-black stroke-black",
            }
        },
        selectMenu: {
            slots: {
                base: [
                    'relative group rounded-md inline-flex items-center focus:outline-none disabled:cursor-not-allowed',
                    'disabled:opacity-75 transition-colors w-full bg-[#202225]! ring ring-[#202225]! text-white!'
                ],
                leading: 'absolute inset-y-0 start-0 flex items-center',
                leadingIcon: 'shrink-0 text-white!',
                leadingAvatar: 'shrink-0',
                leadingAvatarSize: '',
                trailing: 'absolute inset-y-0 end-0 flex items-center',
                trailingIcon: 'shrink-0 text-white!',
                value: 'truncate pointer-events-none',
                placeholder: 'truncate text-white',
                arrow: 'fill-white! stroke-white!',
                content: [
                    'max-h-60 w-(--reka-select-trigger-width) bg-[#202225] shadow-lg rounded-md ring ring-[#202225] overflow-hidden origin-(--reka-select-content-transform-origin) pointer-events-auto flex flex-col',
                    'origin-(--reka-combobox-content-transform-origin) w-(--reka-combobox-trigger-width)'
                ],
                viewport: 'relative scroll-py-1 overflow-y-auto flex-1',
                group: 'p-1 isolate',
                empty: 'text-center text-white',
                label: 'font-semibold text-white',
                separator: '-mx-1 my-1 h-px bg-border',
                item: [
                    'group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1]',
                    'before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75',
                    'text-white! data-highlighted:not-data-disabled:text-highlighted',
                    'data-highlighted:not-data-disabled:before:bg-elevated/50',
                    'transition-colors before:transition-colors'
                ],
                itemLeadingIcon: [
                    'shrink-0 text-white! group-data-highlighted:not-group-data-disabled:text-white',
                    'transition-colors'
                ],
                itemLeadingAvatar: 'shrink-0',
                itemLeadingAvatarSize: '',
                itemLeadingChip: 'shrink-0',
                itemLeadingChipSize: '',
                itemTrailing: 'ms-auto inline-flex gap-1.5 items-center',
                itemTrailingIcon: 'shrink-0',
                itemWrapper: 'flex-1 flex flex-col min-w-0',
                itemLabel: 'truncate text-white!',
                itemDescription: 'truncate text-muted',
                input: 'border-b border-black',
                focusScope: 'flex flex-col min-h-0',
                trailingClear: 'p-0'
            },
        }
    }
})