<template>
    <div class="combobox-input">
        <select onchange="run()" @select="$emit('update:idSelect', selected);">
            <option v-for="(item, index) in listData" :key="index" :value="item.Id">{{item.Name}}</option>
        </select>
    </div>
</template>
<script>
export default {
    name: "HCombobox",
    data(){
        return {
            // listData: [{Id: 1, Name: "HN"}, {Id: 2, Name: "TP HCM"}], 
            // idSelect: 1
            selected: 0
        }
    }, 
    props:{
        idSelect:{
            type: Number, 
            default: 1
        },
        listData:{
            type: Array,
            
        }
    },
    created(){
        this.selected = this.idSelect;
    },
    updated(){
        console.log(this.selected);
    }, 
    watch:{
        idSelect(){
            console.log(this.idSelect);
        }
    },
    methods:{
        run(){
            console.log("ddax 6tha");
        }
    }
}
</script>
<style scoped>
    .combobox-input{
        text-align: left;
        height: 32px;
        width: 50%;
    }

    .combobox-input select{
        height: 100%;
        border: 1px solid black;
        border-radius: 4px;
        padding: 0 8px;
        width: 100%;
        /* outline: none; */
    }

    select:focus{
        border: 1px solid #16f020;
    }

    select:hover{
        border: 1px solid #16f020;
    }

    

</style>
