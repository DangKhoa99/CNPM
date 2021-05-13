import React from 'react'
import "../../style/DetailUser.css"
import * as myConstClass from "../../constants/constantsLanguage"

function DetailUser({
    language,
    idCustomer,
    isAdmin,
    fullName,
    username,
    email,
    phone,
    sex,
    address
}) {
    let content = myConstClass.LANGUAGE;
    language === "English"
      ? (content = content.English)
      : (content = content.Vietnam);

    return (
        <div className="detailUser">
            <table className="detailUser_table">
                <tbody style={{cursor: "pointer"}}>
                    <tr>
                        <td>
                            {content.idAccount}:
                        </td>
                        <td style={{fontWeight: "600"}}>
                            {idCustomer}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {content.role}:
                        </td>
                        <td style={{fontWeight: "600"}}>
                            {isAdmin ? content.admin : content.user}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {content.fullName}:
                        </td>
                        <td style={{fontWeight: "600"}}>
                            {fullName}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {content.username}:
                        </td>
                        <td style={{fontWeight: "600"}}>
                            {username}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Email:
                        </td>
                        <td style={{fontWeight: "600"}}>
                            {email ? email : content.notUpdate}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {content.phoneNumber}:
                        </td>
                        <td style={{fontWeight: "600"}}>
                            {phone ? phone : content.notUpdate}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {content.sex}:
                        </td>
                        <td style={{fontWeight: "600"}}>
                            {sex ? content.male : content.female}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {content.address}:
                        </td>
                        <td style={{fontWeight: "600"}}>
                            {address ? address : content.notUpdate}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default DetailUser
