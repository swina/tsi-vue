<template>
    <div class="ml-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        <div class="grid grid-cols-1 gap-4">
            <w-badge>
                <i class="material-icons text-5xl" slot="icon">bus_alert</i>
                <span slot="content">Take a tour</span>
            </w-badge>
            <w-badge>
                <i class="material-icons text-5xl" slot="icon">widgets</i>
                <span slot="content">Create a block</span>
            </w-badge>
            <w-badge>
                <i class="material-icons text-5xl" slot="icon">article</i>
                <span slot="content">Create an article</span>
            </w-badge>
            <w-badge>
                <i class="material-icons text-5xl" slot="icon">share</i>
                <span slot="content">Social post</span>
            </w-badge>
           
        </div>
        <div class="col-span-3relative h-1/2">
            
        </div>
    </div>
</template>

<script>
import WBadge from '@/components/ui/badge'
export default {
    name: 'WhoobeUIBadge',
    components:{ WBadge },
    
}
</script>