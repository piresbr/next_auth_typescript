export const resetEmailTemplate = `
<td class="esd-stripe" style="background-color: #fafafa;" bgcolor="#fafafa" align="center">
    <table class="es-content-body" style="background-color: #ffffff;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
        <tbody>
            <tr>
                <td class="esd-structure es-p40t es-p20r es-p20l" style="background-color: transparent; background-position: left top;" bgcolor="transparent" align="left">
                    <table width="100%" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td class="esd-container-frame" width="560" valign="top" align="center">
                                    <table style="background-position: left top;" width="100%" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td class="esd-block-text es-p15t es-p15b" align="center">
                                                    <h1 style="color: #333333; font-size: 20px;"><strong>FORGOT YOUR </strong></h1>
                                                    <h1 style="color: #333333; font-size: 20px;"><strong>&nbsp;PASSWORD?</strong></h1>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="esd-block-text es-p40r es-p40l" align="center">
                                                    <p>HI,&nbsp;{{name}}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="esd-block-text es-p35r es-p40l" align="left">
                                                    <p style="text-align: center;">There was a request to change your password!</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="esd-block-text es-p25t es-p40r es-p40l" align="center">
                                                    <p>If did not make this request, just ignore this email. Otherwise, please click the button below to change your password:</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="esd-block-button es-p40t es-p40b es-p10r es-p10l" align="center">
                                                    <!--[if mso]><a href="{{email_link}}" target="_blank" hidden>
	<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="{{email_link}}"
                style="height:46px; v-text-anchor:middle; width:176px" arcsize="22%" strokecolor="#3d5ca3" strokeweight="2px" fillcolor="#ffffff">
		<w:anchorlock></w:anchorlock>
		<center style='color:#3d5ca3; font-family:arial, "helvetica neue", helvetica, sans-serif; font-size:14px; font-weight:700; line-height:14px;  mso-text-raise:1px'>RESET PASSWORD</center>
	</v:roundrect></a>
<![endif]-->
                                                    <!--[if !mso]><!-- --><span class="msohide es-button-border"><a href="{{email_link}}" class="es-button" target="_blank">RESET PASSWORD</a></span>
                                                    <!--<![endif]-->
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td class="esd-structure es-p20t es-p10r es-p10l" style="background-position: center center;" align="left">
                    <!--[if mso]><table width="580" cellpadding="0" cellspacing="0"><tr><td width="199" valign="top"><![endif]-->
                    <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                        <tbody>
                            <tr>
                                <td class="esd-container-frame" width="199" align="left">
                                    <table style="background-position: center center;" width="100%" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td align="center" class="esd-empty-container" style="display: none;"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!--[if mso]></td><td width="20"></td><td width="361" valign="top"><![endif]-->
                    <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                        <tbody>
                            <tr>
                                <td class="esd-container-frame" width="361" align="left">
                                    <table style="background-position: center center;" width="100%" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td align="center" class="esd-empty-container" style="display: none;"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!--[if mso]></td></tr></table><![endif]-->
                </td>
            </tr>
            <tr>
                <td class="esd-structure es-p5t es-p20b es-p20r es-p20l" style="background-position: left top;" align="left">
                    <table width="100%" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td class="esd-container-frame" width="560" valign="top" align="center">
                                    <table width="100%" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td align="center" class="esd-empty-container" style="display: none;"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</td>
`;
