<template>
    <moka-modal
        buttons="delete"
        @close="$emit('close')"
        @click_0="$emit('close')"
        @click_1="$emit('delete')">
        <div slot="title">Delete object</div>
        <div slot="content" class="text-red-500">
            <p class="p-4">Confirm to delete <span class="font-bold">{{ $store.state.editor.current.name }} {{$store.state.editor.current.type}}</span>?</p>
        </div>
    </moka-modal>
</template>