<template>
    <div class="add-product">
        <h1>Thêm mới phiếu nhập</h1>
        <p class="label-input">Nhà cung cấp sản phẩm:</p>
        <div class="combobox-input">
            <select v-model="purchaseDetail.maSanPham">
                <option v-for="(item, index) in listProduct" :key="index" :value="item.maSanPham">{{item.tenSanPham}}</option>
            </select>
        </div>
        <p class="label-input m-t-10">Số lượng:</p>
        <HInput :value-input.sync="purchaseDetail.soLuong" :error-message="soLuongError" :in-valid="isSoLuongError"/>
        <p class="label-input m-t-10">Tổng tiền:</p>
        <HInput :value-input.sync="purchaseDetail.tongTien" :error-message="tongTienError" :in-valid="isTongTienError"/>
        <p class="label-input m-t-10">Mô tả:</p>
        <HInput :value-input.sync="purchaseDetail.ghiChu"/>
        <div class="footer m-t-10">
            <button class="btn m-r-10" @click="addOnClick">Thêm mới</button>
            <button class="btn" @click="cancelOnClick">Hủy</button>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import HInput from "../components/input.vue"
export default {
   name: "ChiTietPhieuNhap",
   components:{
    HInput
   },
   data(){
    return {
        purchaseDetail: {},
        soLuongError: "",
        tongTienError: "",
        isSoLuongError: false,
        isTongTienError: false,
        listProduct: []
    }
   }, 

    async created(){
        var me = this;
        this.purchaseDetail.maSanPham = 2;
        this.purchaseDetail.maPhieuNhap = this.$route.params.id;
        await axios.get("https://localhost:7188/api/Product")
            .then(function (res) {
                me.listProduct = res.data;
            })
            .catch(function (res) {
                console.log(res);
            });
   },
   methods:{
    async addOnClick(){
        var me = this;
            const isError = this.validate();
            if(!isError){
                await axios.post('https://localhost:7188/api/CTPhieuNhaps', me.purchaseDetail)
                .then(function (res) {
                    console.log(res);
                    alert("Thêm mới thành công");
                })
                .catch(function (res) {
                    console.log(res);
                });
                this.cancelOnClick();
            }
    },
    cancelOnClick(){
        this.purchaseDetail.maSanPham = 2;
        this.purchaseDetail.maPhieuNhap = this.$route.params.id;
        this.isSoLuongError = false;
        this.isTongTienError = false;

        this.purchaseDetail.tongTien = "";
        this.purchaseDetail.ghiChu = "";
        this.purchaseDetail.soLuong = "";
    }, 
    validate(){
        //debugger // eslint-disable-line no-debugger
        let isError = false;
        if(!this.purchaseDetail.soLuong)
        {
            this.soLuongError = "Số lượng trống"
            this.isSoLuongError = true;
            isError = true;
        } else
        if(isNaN(this.purchaseDetail.soLuong))
        {
            this.soLuongError = "Số lượng phải là số"
            this.isSoLuongError = true;
            isError = true;
        }
        else if(this.purchaseDetail.soLuong < 0){
            this.soLuongError = "Số lượng là số dương"
            this.isSoLuongError = true;
            isError = true;
        }
        if(!this.purchaseDetail.tongTien)
        {
            this.tongTienError = "Tổng tiền trống"
            this.isTongTienError = true;
            isError = true;
        } else
        if(isNaN(this.purchaseDetail.tongTien))
        {
            this.tongTienError = "Tổng tiền phải là số"
            this.isTongTienError = true;
            isError = true;
        }
        else if(this.purchaseDetail.tongTien < 0){
            this.tongTienError = "Tổng tiền phải là số dương"
            this.isTongTienError = true;
            isError = true;
        }
        return isError;
    }
   },
   watch:{
    purchaseDetail(){
        if(this.purchaseDetail.soLuong){
            this.isSoLuongError = false;
        }
        if(this.purchaseDetail.tongTien){
            this.isTongTienError = false;
        }
    }
   }
}
</script>
