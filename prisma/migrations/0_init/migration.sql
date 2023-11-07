-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "auth"."aal_level" AS ENUM ('aal1', 'aal2', 'aal3');

-- CreateEnum
CREATE TYPE "auth"."code_challenge_method" AS ENUM ('s256', 'plain');

-- CreateEnum
CREATE TYPE "auth"."factor_status" AS ENUM ('unverified', 'verified');

-- CreateEnum
CREATE TYPE "auth"."factor_type" AS ENUM ('totp', 'webauthn');

-- CreateTable
CREATE TABLE "auth"."audit_log_entries" (
    "instance_id" UUID,
    "id" UUID NOT NULL,
    "payload" JSON,
    "created_at" TIMESTAMPTZ(6),
    "ip_address" VARCHAR(64) NOT NULL DEFAULT '',

    CONSTRAINT "audit_log_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."flow_state" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "auth_code" TEXT NOT NULL,
    "code_challenge_method" "auth"."code_challenge_method" NOT NULL,
    "code_challenge" TEXT NOT NULL,
    "provider_type" TEXT NOT NULL,
    "provider_access_token" TEXT,
    "provider_refresh_token" TEXT,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "authentication_method" TEXT NOT NULL,

    CONSTRAINT "flow_state_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."identities" (
    "id" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "identity_data" JSONB NOT NULL,
    "provider" TEXT NOT NULL,
    "last_sign_in_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "email" TEXT DEFAULT lower((identity_data ->> 'email'::text)),

    CONSTRAINT "identities_pkey" PRIMARY KEY ("provider","id")
);

-- CreateTable
CREATE TABLE "auth"."instances" (
    "id" UUID NOT NULL,
    "uuid" UUID,
    "raw_base_config" TEXT,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "instances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."mfa_amr_claims" (
    "session_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "authentication_method" TEXT NOT NULL,
    "id" UUID NOT NULL,

    CONSTRAINT "amr_id_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."mfa_challenges" (
    "id" UUID NOT NULL,
    "factor_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "verified_at" TIMESTAMPTZ(6),
    "ip_address" INET NOT NULL,

    CONSTRAINT "mfa_challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."mfa_factors" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "friendly_name" TEXT,
    "factor_type" "auth"."factor_type" NOT NULL,
    "status" "auth"."factor_status" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "secret" TEXT,

    CONSTRAINT "mfa_factors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."refresh_tokens" (
    "instance_id" UUID,
    "id" BIGSERIAL NOT NULL,
    "token" VARCHAR(255),
    "user_id" VARCHAR(255),
    "revoked" BOOLEAN,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "parent" VARCHAR(255),
    "session_id" UUID,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."saml_providers" (
    "id" UUID NOT NULL,
    "sso_provider_id" UUID NOT NULL,
    "entity_id" TEXT NOT NULL,
    "metadata_xml" TEXT NOT NULL,
    "metadata_url" TEXT,
    "attribute_mapping" JSONB,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "saml_providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."saml_relay_states" (
    "id" UUID NOT NULL,
    "sso_provider_id" UUID NOT NULL,
    "request_id" TEXT NOT NULL,
    "for_email" TEXT,
    "redirect_to" TEXT,
    "from_ip_address" INET,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "flow_state_id" UUID,

    CONSTRAINT "saml_relay_states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."schema_migrations" (
    "version" VARCHAR(255) NOT NULL,

    CONSTRAINT "schema_migrations_pkey" PRIMARY KEY ("version")
);

-- CreateTable
CREATE TABLE "auth"."sessions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "factor_id" UUID,
    "aal" "auth"."aal_level",
    "not_after" TIMESTAMPTZ(6),

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."sso_domains" (
    "id" UUID NOT NULL,
    "sso_provider_id" UUID NOT NULL,
    "domain" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "sso_domains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."sso_providers" (
    "id" UUID NOT NULL,
    "resource_id" TEXT,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "sso_providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."users" (
    "instance_id" UUID,
    "id" UUID NOT NULL,
    "aud" VARCHAR(255),
    "role" VARCHAR(255),
    "email" VARCHAR(255),
    "encrypted_password" VARCHAR(255),
    "email_confirmed_at" TIMESTAMPTZ(6),
    "invited_at" TIMESTAMPTZ(6),
    "confirmation_token" VARCHAR(255),
    "confirmation_sent_at" TIMESTAMPTZ(6),
    "recovery_token" VARCHAR(255),
    "recovery_sent_at" TIMESTAMPTZ(6),
    "email_change_token_new" VARCHAR(255),
    "email_change" VARCHAR(255),
    "email_change_sent_at" TIMESTAMPTZ(6),
    "last_sign_in_at" TIMESTAMPTZ(6),
    "raw_app_meta_data" JSONB,
    "raw_user_meta_data" JSONB,
    "is_super_admin" BOOLEAN,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "phone" TEXT,
    "phone_confirmed_at" TIMESTAMPTZ(6),
    "phone_change" TEXT DEFAULT '',
    "phone_change_token" VARCHAR(255) DEFAULT '',
    "phone_change_sent_at" TIMESTAMPTZ(6),
    "confirmed_at" TIMESTAMPTZ(6) DEFAULT LEAST(email_confirmed_at, phone_confirmed_at),
    "email_change_token_current" VARCHAR(255) DEFAULT '',
    "email_change_confirm_status" SMALLINT DEFAULT 0,
    "banned_until" TIMESTAMPTZ(6),
    "reauthentication_token" VARCHAR(255) DEFAULT '',
    "reauthentication_sent_at" TIMESTAMPTZ(6),
    "is_sso_user" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pacote" (
    "cdpacote" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "cdusuario" UUID NOT NULL,
    "nmpacote" VARCHAR(255),

    CONSTRAINT "pacote_pkey" PRIMARY KEY ("cdpacote")
);

-- CreateTable
CREATE TABLE "public"."pacote_item" (
    "cdpacoteitem" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "cdpacote" UUID NOT NULL,
    "cdproduto" UUID NOT NULL,
    "cdsubproduto" UUID,
    "cdsubprodutotipo" UUID,

    CONSTRAINT "pacote_item_pkey" PRIMARY KEY ("cdpacoteitem")
);

-- CreateTable
CREATE TABLE "public"."pedido" (
    "cdpedido" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "cdusuario" UUID NOT NULL,
    "dtpedido" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cdpedidosituacao" UUID,

    CONSTRAINT "pedido_pkey" PRIMARY KEY ("cdpedido")
);

-- CreateTable
CREATE TABLE "public"."pedido_pacote" (
    "cdpedidopacote" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "cdpedido" UUID NOT NULL,
    "cdpacote" UUID NOT NULL,

    CONSTRAINT "pedido_pacote_pkey" PRIMARY KEY ("cdpedidopacote")
);

-- CreateTable
CREATE TABLE "public"."pedido_situacao" (
    "cdpedidosituacao" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "nmpedidosituacao" VARCHAR(255) NOT NULL,
    "sgpedidosituacao" CHAR(3) NOT NULL,

    CONSTRAINT "pedido_situacao_pkey" PRIMARY KEY ("cdpedidosituacao")
);

-- CreateTable
CREATE TABLE "public"."produto" (
    "cdproduto" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "cdprodutotipo" UUID NOT NULL,
    "nmproduto" VARCHAR(50) NOT NULL,
    "deproduto" VARCHAR NOT NULL,
    "possuisubprodutos" BOOLEAN DEFAULT false,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("cdproduto")
);

-- CreateTable
CREATE TABLE "public"."produto_foto" (
    "cdprodutofoto" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "cdproduto" UUID NOT NULL,
    "nmprodutofoto" VARCHAR(50),
    "nmpath" VARCHAR(255),
    "nmmimetype" VARCHAR(100),
    "nmaspect" VARCHAR(5),

    CONSTRAINT "produto_foto_pkey" PRIMARY KEY ("cdprodutofoto")
);

-- CreateTable
CREATE TABLE "public"."produto_preco" (
    "cdprodutopreco" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "cdproduto" UUID,
    "nmproduto" VARCHAR(255) NOT NULL,
    "vlproduto" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "dtinicio" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dtfim" TIMESTAMP(6),

    CONSTRAINT "produto_preco_pkey" PRIMARY KEY ("cdprodutopreco")
);

-- CreateTable
CREATE TABLE "public"."produto_tipo" (
    "cdprodutotipo" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "nmprodutotipo" VARCHAR(255) NOT NULL,
    "deprodutotipo" VARCHAR(255),

    CONSTRAINT "produto_tipo_pkey" PRIMARY KEY ("cdprodutotipo")
);

-- CreateTable
CREATE TABLE "public"."sub_produto" (
    "cdsubproduto" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "cdproduto" UUID NOT NULL,
    "cdsubprodutotipo" UUID NOT NULL,
    "nmsubproduto" VARCHAR(255),
    "nmsubprodutotipo" VARCHAR(255) NOT NULL,

    CONSTRAINT "sub_produto_pkey" PRIMARY KEY ("cdsubproduto")
);

-- CreateTable
CREATE TABLE "public"."sub_produto_foto" (
    "cdsubprodutofoto" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "cdsubproduto" UUID NOT NULL,
    "nmsubprodutofoto" VARCHAR(50),
    "nmpath" VARCHAR(255),
    "nmmimetype" VARCHAR(100),
    "nmaspect" VARCHAR(5),
    "nmsubprodutofototipo" VARCHAR(255) NOT NULL DEFAULT 'BANNER/AVATAR',

    CONSTRAINT "sub_produto_foto_pkey" PRIMARY KEY ("cdsubprodutofoto")
);

-- CreateTable
CREATE TABLE "public"."sub_produto_foto_tipo" (
    "cdsubprodutofototipo" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "nmsubprodutofototipo" VARCHAR(255) NOT NULL,
    "desubprodutofototipo" VARCHAR(255),

    CONSTRAINT "sub_produto_foto_tipo_pkey" PRIMARY KEY ("cdsubprodutofototipo")
);

-- CreateTable
CREATE TABLE "public"."sub_produto_preco" (
    "cdsubprodutopreco" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "cdsubproduto" UUID NOT NULL,
    "nmsubproduto" VARCHAR(255) NOT NULL,
    "vlsubproduto" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "dtinicio" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dtfim" TIMESTAMP(6),

    CONSTRAINT "sub_produto_preco_pkey" PRIMARY KEY ("cdsubprodutopreco")
);

-- CreateTable
CREATE TABLE "public"."sub_produto_tipo" (
    "cdsubprodutotipo" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "nmsubprodutotipo" VARCHAR(255),
    "desubprodutotipo" VARCHAR(255),

    CONSTRAINT "sub_produto_tipo_pkey" PRIMARY KEY ("cdsubprodutotipo")
);

-- CreateIndex
CREATE INDEX "audit_logs_instance_id_idx" ON "auth"."audit_log_entries"("instance_id");

-- CreateIndex
CREATE INDEX "flow_state_created_at_idx" ON "auth"."flow_state"("created_at" DESC);

-- CreateIndex
CREATE INDEX "idx_auth_code" ON "auth"."flow_state"("auth_code");

-- CreateIndex
CREATE INDEX "idx_user_id_auth_method" ON "auth"."flow_state"("user_id", "authentication_method");

-- CreateIndex
CREATE INDEX "identities_email_idx" ON "auth"."identities"("email");

-- CreateIndex
CREATE INDEX "identities_user_id_idx" ON "auth"."identities"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "mfa_amr_claims_session_id_authentication_method_pkey" ON "auth"."mfa_amr_claims"("session_id", "authentication_method");

-- CreateIndex
CREATE INDEX "mfa_challenge_created_at_idx" ON "auth"."mfa_challenges"("created_at" DESC);

-- CreateIndex
CREATE INDEX "factor_id_created_at_idx" ON "auth"."mfa_factors"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "mfa_factors_user_id_idx" ON "auth"."mfa_factors"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_unique" ON "auth"."refresh_tokens"("token");

-- CreateIndex
CREATE INDEX "refresh_tokens_instance_id_idx" ON "auth"."refresh_tokens"("instance_id");

-- CreateIndex
CREATE INDEX "refresh_tokens_instance_id_user_id_idx" ON "auth"."refresh_tokens"("instance_id", "user_id");

-- CreateIndex
CREATE INDEX "refresh_tokens_parent_idx" ON "auth"."refresh_tokens"("parent");

-- CreateIndex
CREATE INDEX "refresh_tokens_session_id_revoked_idx" ON "auth"."refresh_tokens"("session_id", "revoked");

-- CreateIndex
CREATE INDEX "refresh_tokens_updated_at_idx" ON "auth"."refresh_tokens"("updated_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "saml_providers_entity_id_key" ON "auth"."saml_providers"("entity_id");

-- CreateIndex
CREATE INDEX "saml_providers_sso_provider_id_idx" ON "auth"."saml_providers"("sso_provider_id");

-- CreateIndex
CREATE INDEX "saml_relay_states_created_at_idx" ON "auth"."saml_relay_states"("created_at" DESC);

-- CreateIndex
CREATE INDEX "saml_relay_states_for_email_idx" ON "auth"."saml_relay_states"("for_email");

-- CreateIndex
CREATE INDEX "saml_relay_states_sso_provider_id_idx" ON "auth"."saml_relay_states"("sso_provider_id");

-- CreateIndex
CREATE INDEX "sessions_not_after_idx" ON "auth"."sessions"("not_after" DESC);

-- CreateIndex
CREATE INDEX "sessions_user_id_idx" ON "auth"."sessions"("user_id");

-- CreateIndex
CREATE INDEX "user_id_created_at_idx" ON "auth"."sessions"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "sso_domains_sso_provider_id_idx" ON "auth"."sso_domains"("sso_provider_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "auth"."users"("phone");

-- CreateIndex
CREATE INDEX "users_instance_id_idx" ON "auth"."users"("instance_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_produto_sub" ON "public"."pacote_item"("cdpacote", "cdproduto", "cdsubprodutotipo");

-- CreateIndex
CREATE UNIQUE INDEX "uq_sg" ON "public"."pedido_situacao"("sgpedidosituacao");

-- CreateIndex
CREATE UNIQUE INDEX "uq_nmproduto" ON "public"."produto"("nmproduto");

-- CreateIndex
CREATE UNIQUE INDEX "uq_produto_tipo" ON "public"."produto_tipo"("nmprodutotipo");

-- CreateIndex
CREATE UNIQUE INDEX "uq_sub_produto_tipo_nm_per_produto" ON "public"."sub_produto"("cdproduto", "cdsubprodutotipo", "nmsubproduto");

-- CreateIndex
CREATE UNIQUE INDEX "uq_sub_produto_foto_tipo" ON "public"."sub_produto_foto_tipo"("nmsubprodutofototipo");

-- CreateIndex
CREATE UNIQUE INDEX "uq_sub_produto_tipo" ON "public"."sub_produto_tipo"("nmsubprodutotipo");

-- AddForeignKey
ALTER TABLE "auth"."identities" ADD CONSTRAINT "identities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth"."mfa_amr_claims" ADD CONSTRAINT "mfa_amr_claims_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "auth"."sessions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth"."mfa_challenges" ADD CONSTRAINT "mfa_challenges_auth_factor_id_fkey" FOREIGN KEY ("factor_id") REFERENCES "auth"."mfa_factors"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth"."mfa_factors" ADD CONSTRAINT "mfa_factors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth"."refresh_tokens" ADD CONSTRAINT "refresh_tokens_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "auth"."sessions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth"."saml_providers" ADD CONSTRAINT "saml_providers_sso_provider_id_fkey" FOREIGN KEY ("sso_provider_id") REFERENCES "auth"."sso_providers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth"."saml_relay_states" ADD CONSTRAINT "saml_relay_states_flow_state_id_fkey" FOREIGN KEY ("flow_state_id") REFERENCES "auth"."flow_state"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth"."saml_relay_states" ADD CONSTRAINT "saml_relay_states_sso_provider_id_fkey" FOREIGN KEY ("sso_provider_id") REFERENCES "auth"."sso_providers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth"."sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth"."sso_domains" ADD CONSTRAINT "sso_domains_sso_provider_id_fkey" FOREIGN KEY ("sso_provider_id") REFERENCES "auth"."sso_providers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."pacote" ADD CONSTRAINT "pacote_cdusuario_fkey" FOREIGN KEY ("cdusuario") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."pacote_item" ADD CONSTRAINT "pacote_item_cdpacote_fkey" FOREIGN KEY ("cdpacote") REFERENCES "public"."pacote"("cdpacote") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."pacote_item" ADD CONSTRAINT "pacote_item_cdproduto_fkey" FOREIGN KEY ("cdproduto") REFERENCES "public"."produto"("cdproduto") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."pacote_item" ADD CONSTRAINT "pacote_item_cdsubproduto_fkey" FOREIGN KEY ("cdsubproduto") REFERENCES "public"."sub_produto"("cdsubproduto") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."pedido" ADD CONSTRAINT "pedido_cdpedidosituacao_fk" FOREIGN KEY ("cdpedidosituacao") REFERENCES "public"."pedido_situacao"("cdpedidosituacao") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."pedido_pacote" ADD CONSTRAINT "pedido_pacote_cdpacote_fkey" FOREIGN KEY ("cdpacote") REFERENCES "public"."pacote"("cdpacote") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."pedido_pacote" ADD CONSTRAINT "pedido_pacote_cdpedido_fkey" FOREIGN KEY ("cdpedido") REFERENCES "public"."pedido"("cdpedido") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."produto" ADD CONSTRAINT "produto_cdprodutotipo_fkey" FOREIGN KEY ("cdprodutotipo") REFERENCES "public"."produto_tipo"("cdprodutotipo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."produto_foto" ADD CONSTRAINT "produto_foto_cdproduto_fkey" FOREIGN KEY ("cdproduto") REFERENCES "public"."produto"("cdproduto") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."produto_preco" ADD CONSTRAINT "produto_preco_cdproduto_fkey" FOREIGN KEY ("cdproduto") REFERENCES "public"."produto"("cdproduto") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."sub_produto" ADD CONSTRAINT "fk_nmsubprodutotipo" FOREIGN KEY ("nmsubprodutotipo") REFERENCES "public"."sub_produto_tipo"("nmsubprodutotipo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."sub_produto" ADD CONSTRAINT "sub_produto_cdproduto_fkey" FOREIGN KEY ("cdproduto") REFERENCES "public"."produto"("cdproduto") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."sub_produto" ADD CONSTRAINT "sub_produto_cdsubprodutotipo_fkey" FOREIGN KEY ("cdsubprodutotipo") REFERENCES "public"."sub_produto_tipo"("cdsubprodutotipo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."sub_produto_foto" ADD CONSTRAINT "sub_produto_foto_cdsubproduto_fkey" FOREIGN KEY ("cdsubproduto") REFERENCES "public"."sub_produto"("cdsubproduto") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."sub_produto_preco" ADD CONSTRAINT "sub_produto_preco_cdsubproduto_fkey" FOREIGN KEY ("cdsubproduto") REFERENCES "public"."sub_produto"("cdsubproduto") ON DELETE NO ACTION ON UPDATE NO ACTION;

