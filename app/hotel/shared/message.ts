declare var bootbox: BootboxStatic;
declare var toastr: Toastr;

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

    public static confirmDelete(message: string, callBack: (result: boolean) => void) {
        bootbox.confirm({
            message: (message !== null && message !== "") ? message : "Bạn muốn xóa dữ liệu này?",
            title: "Xác nhận",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Không',
                    className: 'btn-default'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Xóa',
                    className: 'btn-danger'
                }
            },
            size: "small",
            callback: callBack
        });
    }

}