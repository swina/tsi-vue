<template>
    <div class="grid grid-cols-3 rounded shadow bg-gray-100 p-0 h-20 w-full">
        <div class="bg-gray-600 rounded-tl rounded-bl flex flex-col text-gray-200 justify-center">
            <slot name="icon"></slot>
        </div>
        <div class="col-span-2 justify-center flex flex-col items-start p-1 pl-2">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WhoobeBadge',
    
}
</script>