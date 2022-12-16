<template>
    <div class="add-product">
        <h1>Thêm mới sản phẩm</h1>
        <p class="label-input">Tên sản phẩm:</p>
        <HInput :value-input.sync="product.tenSanPham" :error-message="tenSanPhamError" :in-valid="inputNameError"/>
        <p class="label-input m-t-10">Thương hiệu sản phẩm:</p>
        <div class="combobox-input">
            <select v-model="product.maThuongHieu">
                <option v-for="(item, index) in listTrademark" :key="index" :value="item.maThuongHieu">{{item.tenThuongHieu}}</option>
            </select>
        </div>
        <p class="label-input m-t-10">Đơn giá nhập:</p>
        <HInput :value-input.sync="product.donGiaNhap" :error-message="donGiaNhapError" :in-valid="inputPriceImportError"/>
        <p class="label-input m-t-10">Đơn giá bán:</p>
        <HInput :value-input.sync="product.donGiaBan" :error-message="donGiaBanError" :in-valid="inputPriceError"/>
        <p class="label-input m-t-10">Số lượng:</p>
        <HInput :value-input.sync="product.soLuong" :error-message="soLuongError" :in-valid="inputQuantityError"/>
        <p class="label-input m-t-10">Hình ảnh:</p>
        <HInput :value-input.sync="product.hinhAnh" :error-message="hinhAnhError" :in-valid="inputImageError"/>
        <p class="label-input m-t-10">Mô tả:</p>
        <HInput :value-input.sync="product.moTa" :error-message="moTaError" :in-valid="inputDesError"/>
        <div class="footer m-t-10">
            <button class="btn m-r-10" @click="addOnClick">Thêm mới</button>
            <button class="btn" @click="cancelOnClick">Hủy</button>
        </div>
    </div>
</template>

<script>
import HInput from '../components/input.vue'
import axios from 'axios'
export default{
    name: "SanPham",
    components: {
        HInput
    },
    data(){
        return {
            tenSanPham: "",
            tenSanPhamError: "",
            inputNameError: false,
            maThuongHieu: 1,
            listTrademark: [],
            donGiaNhap: "",
            donGiaNhapError: "",
            inputPriceImportError: false,
            donGiaBan: "",
            donGiaBanError: "",
            inputPriceError: false,
            soLuong: "",
            soLuongError: "",
            inputQuantityError: false,
            moTa: "",
            moTaError: "",
            inputDesError: false,
            hinhAnh: "",
            hinhAnhError: "",
            inputImageError: false,
            product: {},
        }
    },
    methods:{
        async addOnClick(){
            let isError = this.validate();
            var me = this;
            if(!isError){
                await axios.post('https://localhost:7188/api/Product', me.product)
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

        validate(){
            let isError = false;
            if(!this.product.tenSanPham)
            {
                this.tenSanPhamError = "Tên sản phẩm trống"
                this.inputNameError = true;
                isError = true;
            }
            if(!this.product.donGiaNhap)
            {
                this.donGiaNhapError = "Giá nhập trống"
                this.inputPriceImportError = true;
                isError = true;
            } else
            if(isNaN(this.product.donGiaNhap))
            {
                this.donGiaNhapError = "Giá nhập phải là số"
                this.inputPriceImportError = true;
                isError = true;
            }
            else if(this.product.donGiaNhap < 0){
                this.donGiaNhapError = "Giá nhập phải là số dương"
                this.inputPriceImportError = true;
                isError = true;
            }

            if(!this.product.donGiaBan)
            {
                this.donGiaBanError = "Giá bán trống"
                this.inputPriceError = true;
                isError = true;
            } else
            if(isNaN(this.product.donGiaBan))
            {
                this.donGiaBanError = "Giá bán phải là số"
                this.inputPriceError = true;
                isError = true;
            }
            else if(this.product.donGiaBan < 0){
                this.donGiaBanError = "Giá bán phải là số dương"
                this.inputPriceError = true;
                isError = true;
            }

            if(!this.product.soLuong)
            {
                this.soLuongError = "Số lượng trống"
                this.inputQuantityError = true;
                isError = true;
            } else
            if(isNaN(this.product.soLuong))
            {
                this.soLuongError = "Số lượng phải là số"
                this.inputQuantityError = true;
                isError = true;
            }
            else if(this.product.soLuong < 0){
                this.soLuongError = "Số lượng phải là số dương"
                this.inputQuantityError = true;
                isError = true;
            }

            if(!this.product.hinhAnh)
            {
                this.hinhAnhError = "Hình ảnh trống"
                this.inputImageError = true;
                isError = true;
            }
            return isError;
        },
        cancelOnClick(){
            this.product.tenSanPham = "";
            this.product.maThuongHieu = 1;
            this.product.donGiaNhap = "";
            this.product.donGiaBan = "";
            this.product.soLuong = "";
            this.product.hinhAnh = "";
            this.product.moTa = "";
        },
       
    } ,
    watch:{
        product(){
            if(this.product.tenSanPham){
                this.inputNameError = false;
            }
            if(this.product.donGiaBan) 
              this.inputPriceError = false ;
            if( this.product.donGiaNhap)
                 this.inputPriceImportError = false ;
            if(this.product.soLuong)
             this.inputQuantityError = false;
            if(this.product.hinhAnh)
             this.inputImageError = false ;
        }

    }, 
    async created(){
        this.product.maThuongHieu = 1;
        var me = this;
       await axios.get("https://localhost:7188/api/ThuongHieus")
            .then(function (res) {
                me.listTrademark = res.data;
            })
            .catch(function (res) {
                console.log(res);
            });
    }
}
</script>
<style>
    .add-product{
        padding: 0 100px;
    }

    .m-t-10{
        margin-top: 10px !important;
    }

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

    .footer{
        text-align: left;
    }
    .btn{
        height: 34px;
        border: none;
        background-color: #5690f5;
        border-radius: 4px;
        min-width: 80px;
        color: #fff;
        font-weight: 600;
    }

    .btn:hover{
        cursor: pointer;
        background-color: #025bf5;
    }
    .m-r-10{
        margin-right: 10px;
    }

</style>
