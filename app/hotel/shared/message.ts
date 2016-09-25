declare var toastr: any;

export class MessageProvider {
    public static saveSuccess() {
        toastr.success("Lưu dữ liệu thành công", "Lưu dữ liệu");
    }
    public static saveError(message?: string) {
        toastr.error("Lữu dữ liệu không thành công:<br>" + message, "Lưu dữ liệu");
    }

    public static deleteSuccess() {
        toastr.success("Xóa dữ liệu thành công", "Xóa dữ liệu");
    }
    public static deleteError(message?: string) {
        toastr.error("Xóa dữ liệu không thành công:<br>" + message, "Xóa dữ liệu");
    } 
    
}