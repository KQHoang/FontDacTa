<template>
    <div class="add-product">
        <h1>Thêm mới phiếu nhập</h1>
        <p class="label-input">Nhà cung cấp sản phẩm:</p>
        <div class="combobox-input">
            <select v-model="purchase.maTaiKhoan">
                <option v-for="(item, index) in listSupplier" :key="index" :value="item.maTaiKhoan">{{item.ten}}</option>
            </select>
        </div>
        <p class="label-input m-t-10">Trạng thái phiếu nhập:</p>
        <div class="combobox-input">
            <select v-model="purchase.trangThai">
                <option v-for="(item, index) in listStatus" :key="index" :value="item.Id">{{item.Name}}</option>
            </select>
        </div>
        <p class="label-input m-t-10">Ngày lập:</p>
        <div class="input">
            <div class="d-flex">
                <input type="date" :class="{'input-invalid': isNgayError}" v-model="purchase.ngay">
                <div v-if="isNgayError" class="input-error d-flex">Ngày không được để trống</div>
            </div>
        </div>
        <p class="label-input m-t-10">Tổng tiền:</p>
        <HInput :value-input.sync="purchase.tongTien" :error-message="priceError" :in-valid="isPriceError"/>
        <p class="label-input m-t-10">Mô tả:</p>
        <HInput :value-input.sync="purchase.moTa" :error-message="moTaError" :in-valid="isMoTaError"/>
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
    name: "Purchase-Hoang",
    components:{
        HInput
    },
    data(){
        return {
            purchase: {}, 
            listStatus: [{Id: 1, Name: "Đã thanh toán"}, {Id: 2, Name: "Chưa thanh toán"}],
            listSupplier: [],
            isNgayError: false,
            trangThaiError: "",
            isTrangThaiError: false,
            priceError:"",
            isPriceError: false,
            moTaError: "",
            isMoTaError: false,
            idMax: null

        }
    }, 
    async created(){
        this.purchase.maTaiKhoan= 1;
        this.purchase.trangThai= 1;
        let now = new Date();
        this.purchase.ngay = now.getFullYear().toString() + "-" + now.getMonth().toString() + "-"+ now.getDate().toString();
        var me = this;
        await axios.get("https://localhost:7188/api/TaiKhoans")
            .then(function (res) {
                me.listSupplier = res.data;
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
                await axios.post('https://localhost:7188/api/PhieuNhaps', me.purchase)
                .then(function (res) {
                    console.log(res);
                    alert("Thêm mới thành công");
                })
                .catch(function (res) {
                    console.log(res);
                });
                this.cancelOnClick();
            }
            await this.getPhieuNhapIdMax();
            this.$router.push({name: "ChiTiet" , params: {id: this.idMax}}).catch(() => {});
        },
        cancelOnClick(){
            debugger // eslint-disable-line no-debugger
            this.purchase.maTaiKhoan= 1;
            this.purchase.trangThai= 1;
            let now = new Date();
            this.purchase.ngay = now.getFullYear().toString() + "-" + now.getMonth().toString() + "-"+ now.getDate().toString();
            this.purchase.tongTien = null;
            this.purchase.moTa = "";

            // this.$router.push({name: "ChiTiet" , params: {id: 1}}).catch(() => {});
        }, 
        async getPhieuNhapIdMax(){
            var me = this;
            await axios.get('https://localhost:7188/Max')
                .then(function (res) {
                    console.log(res);
                    me.idMax = res.data;
                })
                .catch(function (res) {
                    console.log(res);
                });
        },
        validate(){
            let isError = false;
            if(!this.purchase.tongTien)
            {
                this.priceError = "Tổng tiền trống"
                this.isPriceError = true;
                isError = true;
            } else
            if(isNaN(this.purchase.tongTien))
            {
                this.priceError = "Tổng tiền phải là số"
                this.isPriceError = true;
                isError = true;
            }
            else if(this.purchase.tongTien < 0){
                this.priceError = "Tổng tiền là số dương"
                this.isPriceError = true;
                isError = true;
            }
            return isError;
        }
    },
    watch:{
        purchase(){
            if(this.purchase.tongTien)
                this.isPriceError = false;
        }
    }

}
</script>