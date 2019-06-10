/*** 
@controller Name:sap.suite.ui.generic.template.ListReport.view.ListReport,
*@viewId:nw.epm.refapps.st.prod.manage::sap.suite.ui.generic.template.ListReport.view.ListReport::SEPMRA_C_PD_Product
*/
sap.ui.define([
	"sap/ui/core/mvc/ControllerExtension"
	// ,"sap/ui/core/mvc/OverrideExecution"
],
function (
	ControllerExtension
	// ,OverrideExecution
) {
	"use strict";

	return ControllerExtension.extend("customer.opensap.manage.products.ListReport", {

		onShare: function (oEvent) {
			//Similar use case: https://ui5.sap.com/#/topic/a269671fc49e4c75920c108961bf31f2

			// 1. Get SAP Fiori elements extensionAPI instance:
			// * SAP Fiori elements ListReport base controller is accessed by this.base
			// * templateBaseExtension provides public API for SAP Fiori elements extensions, like the extensionAPI that is also used by SAP Fiori elements developers
			var oExtensionAPI = this.base.templateBaseExtension.getExtensionAPI();

			// 2. Get selected products via extensionAPI methods
			// see https:// ui5.sap.com/#/api/sap.suite.ui.generic.template.ListReport.extensionAPI.ExtensionAPI/methods/getSelectedContexts
			var aSeletion = oExtensionAPI.getSelectedContexts();
			if (aSeletion.length > 0) {
				// access your i18n model where the texts are available
				var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

				var sTo = "nobody@sap.com";
				var sSubject = oResourceBundle.getText("SHARE_SUBJECT");
				var sProducts = aSeletion.reduce(function (sText, oSelectedContext) {
					// for each selected product, get the OData entity
					var mSelectedData = oSelectedContext.getObject();
					// add a line with some entity informaton to your email
					return sText + oResourceBundle.getText("SHARE_PRODUCT", [mSelectedData.Product, mSelectedData.Price, mSelectedData.Currency]);
				}, "");
				// combine the body text
				var sBody = oResourceBundle.getText("SHARE_BODY", [sProducts]);
				// use SAPUI5 helper functionality to prepare the email
				sap.m.URLHelper.triggerEmail(sTo, sSubject, sBody);
			}
		}
	});
});
