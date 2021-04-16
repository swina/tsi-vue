<template>
    <moka-modal
        buttons="save"
        @close="$emit('close')"
        @click_0="$emit('close')"
        @click_1="$emit('save')">
        <div slot="title">Save</div>
        <div slot="content">
            <p>Save before to close ?</p>
        </div>
    </moka-modal>
</template>