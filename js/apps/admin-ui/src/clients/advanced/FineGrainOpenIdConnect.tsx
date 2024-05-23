import { ProviderRepresentation } from "@keycloak/keycloak-admin-client/lib/defs/serverInfoRepesentation";
import { ActionGroup, Button, FormGroup } from "@patternfly/react-core";
import { useTranslation } from "react-i18next";
import { HelpItem, SelectControl } from "@keycloak/keycloak-ui-shared";
import { FormAccess } from "../../components/form/FormAccess";
import { MultiLineInput } from "../../components/multi-line-input/MultiLineInput";
import { useServerInfo } from "../../context/server-info/ServerInfoProvider";
import { convertAttributeNameToForm, sortProviders } from "../../util";
import { FormFields } from "../ClientDetails";
import { ApplicationUrls } from "./ApplicationUrls";

type FineGrainOpenIdConnectProps = {
  save: () => void;
  reset: () => void;
  hasConfigureAccess?: boolean;
};

export const FineGrainOpenIdConnect = ({
  save,
  reset,
  hasConfigureAccess,
}: FineGrainOpenIdConnectProps) => {
  const { t } = useTranslation();
  const providers = useServerInfo().providers;
  const clientSignatureProviders = providers?.clientSignature.providers;
  const contentEncryptionProviders = providers?.contentencryption.providers;
  const cekManagementProviders = providers?.cekmanagement.providers;
  const signatureProviders = providers?.signature.providers;

  const convert = (list: { [index: string]: ProviderRepresentation }) =>
    sortProviders(list).map((i) => ({ key: i, value: i }));

  const prependEmpty = (list: { [index: string]: ProviderRepresentation }) => [
    { key: "", value: t("choose") },
    ...convert(list),
  ];

  const prependAny = (list: { [index: string]: ProviderRepresentation }) => [
    { key: "any", value: t("any") },
    ...convert(list),
  ];

  const prependNone = (list: { [index: string]: ProviderRepresentation }) => [
    { key: "none", value: t("none") },
    ...convert(list),
  ];

  return (
    <FormAccess
      role="manage-clients"
      fineGrainedAccess={hasConfigureAccess}
      isHorizontal
    >
      <ApplicationUrls />
      <SelectControl
        name={convertAttributeNameToForm<FormFields>(
          "attributes.access.token.signed.response.alg",
        )}
        label={t("accessTokenSignatureAlgorithm")}
        labelIcon={t("accessTokenSignatureAlgorithmHelp")}
        controller={{
          defaultValue: "",
        }}
        options={prependEmpty(clientSignatureProviders!)}
      />
      <SelectControl
        name={convertAttributeNameToForm<FormFields>(
          "attributes.id.token.signed.response.alg",
        )}
        label={t("idTokenSignatureAlgorithm")}
        labelIcon={t("idTokenSignatureAlgorithmHelp")}
        controller={{
          defaultValue: "",
        }}
        options={prependEmpty(clientSignatureProviders!)}
      />
      <SelectControl
        name={convertAttributeNameToForm<FormFields>(
          "attributes.id.token.encrypted.response.alg",
        )}
        label={t("idTokenEncryptionKeyManagementAlgorithm")}
        labelIcon={t("idTokenEncryptionKeyManagementAlgorithmHelp")}
        controller={{
          defaultValue: "",
        }}
        options={prependEmpty(cekManagementProviders!)}
      />
      <SelectControl
        name={convertAttributeNameToForm<FormFields>(
          "attributes.id.token.encrypted.response.enc",
        )}
        label={t("idTokenEncryptionContentEncryptionAlgorithm")}
        labelIcon={t("idTokenEncryptionContentEncryptionAlgorithmHelp")}
        controller={{
          defaultValue: "",
        }}
        options={prependEmpty(contentEncryptionProviders!)}
      />
      <SelectControl
        name={convertAttributeNameToForm<FormFields>(
          "attributes.user.info.response.signature.alg",
        )}
        label={t("userInfoSignedResponseAlgorithm")}
        labelIcon={t("userInfoSignedResponseAlgorithmHelp")}
        controller={{
          defaultValue: "",
        }}
        options={prependEmpty(signatureProviders!)}
      />
      <SelectControl
        name={convertAttributeNameToForm<FormFields>(
          "attributes.user.info.encrypted.response.alg",
        )}
        label={t("userInfoResponseEncryptionKeyManagementAlgorithm")}
        labelIcon={t("userInfoResponseEncryptionKeyManagementAlgorithmHelp")}
        controller={{
          defaultValue: "",
        }}
        options={prependEmpty(cekManagementProviders!)}
      />
      <SelectControl
        name={convertAttributeNameToForm<FormFields>(
          "attributes.user.info.encrypted.response.enc",
        )}
        label={t("userInfoResponseEncryptionContentEncryptionAlgorithm")}
        labelIcon={t(
          "userInfoResponseEncryptionContentEncryptionAlgorithmHelp",
        )}
        controller={{
          defaultValue: "",
        }}
        options={prependEmpty(contentEncryptionProviders!)}
      />
      <SelectControl
        name={convertAttributeNameToForm<FormFields>(
          "attributes.request.object.signature.alg",
        )}
        label={t("requestObjectSignatureAlgorithm")}
        labelIcon={t("requestObjectSignatureAlgorithmHelp")}
        controller={{
          defaultValue: "",
        }}
        options={[
          { key: "any", value: t("any") },
          ...prependNone(clientSignatureProviders!),
        ]}
      />
      <SelectControl
        name={convertAttributeNameToForm<FormFields>(
          "attributes.request.object.encryption.alg",
        )}
        label={t("requestObjectEncryption")}
        labelIcon={t("requestObjectEncryptionHelp")}
        controller={{
          defaultValue: "",
        }}
        options={prependAny(cekManagementProviders!)}
      />
      <SelectControl
        name={convertAttributeNameToForm<FormFields>(
          "attributes.request.object.encryption.enc",
        )}
        label={t("requestObjectEncoding")}
        labelIcon={t("requestObjectEncodingHelp")}
        controller={{
          defaultValue: "",
        }}
        options={prependAny(contentEncryptionProviders!)}
      />
      <SelectControl
        name={convertAttributeNameToForm<FormFields>(
          "attributes.request.object.required",
        )}
        label={t("requestObjectRequired")}
        labelIcon={t("requestObjectRequiredHelp")}
        controller={{
          defaultValue: "",
        }}
        options={[
          "not required",
          "request or request_uri",
          "request only",
          "request_uri only",
        ].map((p) => ({
          key: p,
          value: t(`requestObject.${p}`),
        }))}
      />
      <FormGroup
        label={t("validRequestURIs")}
        fieldId="validRequestURIs"
        labelIcon={
          <HelpItem
            helpText={t("validRequestURIsHelp")}
            fieldLabelId="validRequestURIs"
          />
        }
      >
        <MultiLineInput
          name={convertAttributeNameToForm("attributes.request.uris")}
          aria-label={t("validRequestURIs")}
          addButtonLabel="addRequestUri"
          stringify
        />
      </FormGroup>
      <SelectControl
        name={convertAttributeNameToForm<FormFields>(
          "attributes.authorization.signed.response.alg",
        )}
        label={t("authorizationSignedResponseAlg")}
        labelIcon={t("authorizationSignedResponseAlgHelp")}
        controller={{
          defaultValue: "",
        }}
        options={prependEmpty(signatureProviders!)}
      />
      <SelectControl
        name={convertAttributeNameToForm<FormFields>(
          "attributes.authorization.encrypted.response.alg",
        )}
        label={t("authorizationEncryptedResponseAlg")}
        labelIcon={t("authorizationEncryptedResponseAlgHelp")}
        controller={{
          defaultValue: "",
        }}
        options={prependEmpty(cekManagementProviders!)}
      />
      <SelectControl
        name={convertAttributeNameToForm<FormFields>(
          "attributes.authorization.encrypted.response.enc",
        )}
        label={t("authorizationEncryptedResponseEnc")}
        labelIcon={t("authorizationEncryptedResponseEncHelp")}
        controller={{
          defaultValue: "",
        }}
        options={prependEmpty(contentEncryptionProviders!)}
      />
      <ActionGroup>
        <Button variant="secondary" id="fineGrainSave" onClick={save}>
          {t("save")}
        </Button>
        <Button id="fineGrainRevert" variant="link" onClick={reset}>
          {t("revert")}
        </Button>
      </ActionGroup>
    </FormAccess>
  );
};
