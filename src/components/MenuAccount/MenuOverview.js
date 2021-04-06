import React from 'react'
import "../../style/MenuOverView.css"

function menuOverview() {
    return (
        <div className="menuOverview">
            <div className="menuOverview_container">
                <h1 className="menuOverview_title">Tổng quan về tài khoản</h1>
                <h3 className="menuOverview_subTitle">Hồ sơ</h3>
                <section>
                    <table className="account_info_table">
                        <colgroup>
                            <col className="account_info_col"></col>
                            <col className="account_info_col"></col>
                        </colgroup>
                        <tbody>
                            <tr className="account_info_row">
                                <td className="account_info_col_left">Họ và tên</td>
                                <td className="account_info_col_right">Nguyễn Minh Đăng Khoa</td>
                            </tr>
                            <tr className="account_info_row">
                                <td className="account_info_col_left">Email</td>
                                <td className="account_info_col_right">51800882@student.tdtu.edu.vn</td>
                            </tr>
                            <tr className="account_info_row">
                                <td className="account_info_col_left">Ngày sinh</td>
                                <td className="account_info_col_right">9 tháng 9, 2000</td>
                            </tr>
                            <tr className="account_info_row">
                                <td className="account_info_col_left">Quốc gia</td>
                                <td className="account_info_col_right">Việt Nam</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <div>
                    <a className="edit_profile" href="/account/profile/">Chỉnh sửa hồ sơ</a>
                </div>
            </div>

        </div>
    )
}

export default menuOverview
