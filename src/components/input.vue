<template>
    <div class="input">
        <div class="d-flex">
            <input type="text" :class="{'input-invalid': inValid}" :value="valueInput" @input="$emit('update:valueInput', $event.target.value);">
            <div v-if="inValid" class="input-error d-flex">{{errorMessage}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HInput", 
    props:{
        valueInput: {
            type: String, 
            default: ""
        }, 
        errorMessage:{
            type: String
        }, 
        inValid:{
            type: Boolean,
            default: false
        }
    
    }, 
    data(){
        return{
            // inputModel: ""
            isError: 0
        }
    },
    watch:{
        valueInput(){
            this.$emit('update:inValid', this.isError);
        }
    },
    created() {
        this.isError = this.inValid;
    }, 
    methods:{
       
    }
}
</script>

<style>
    .d-flex{
        display: flex;
    }   
    .input{
        text-align: left;
    }

    .input input{
        height: 30px;
        padding: 0 8px;
        border: 1px solid black;
        border-radius: 4px;
        width: 50%;
    }

    .input-error{
        margin-left: 10px;
        color: red;
        align-items: end;
    }

    .input input:focus-visible{
        outline: none;
        border: 1px solid #16f020;
    }

    .input input:hover{
        border: 1px solid #16f020;
    }

    .input-invalid{
        border: 1px solid red !important;
    }
   
</style>
<style>
  .label-input{
        text-align: left;
        margin-top: 0 !important;
        margin-bottom: 8px !important;
        color: black;
        font-weight: 600;
    }
</style>