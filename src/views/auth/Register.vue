<template>
  <div class="register">
    <div class="d-flex justify-content-center">
      <div class="my-5 text-center">
        <img :src="logo" alt="" style="max-width: 250px;" class="mb-4"/>

        <!-- region Email -->
        <l-input-field
            :input-type="true"
            v-model="$v.user.email.$model"
            type="email"
            placeholder="Email ..."
            :state="validateState($v.user, 'email')"
        >
          <template #invalid-feedback>
            <invalid-feedback
                :condition="!$v.user.email.required"
                :error-message="required()"
            />
            <invalid-feedback
                :condition="!$v.user.email.email"
                :error-message="email()"
            />
          </template>
        </l-input-field>
        <!-- endregion -->

        <!-- region Username -->
        <l-input-field
            :input-type="true"
            v-model="$v.user.username.$model"
            placeholder="Pseudo ..."
            :state="validateState($v.user, 'username')"
        >
          <template #invalid-feedback>
            <invalid-feedback
                :condition="!$v.user.username.required"
                :error-message="required()"
            />
            <invalid-feedback
                :condition="!$v.user.username.minLength"
                :error-message="minLength($v.user.username.$params.minLength.min)"
            />
            <invalid-feedback
                :condition="!$v.user.username.maxLength"
                :error-message="maxLength($v.user.username.$params.maxLength.max)"
            />
          </template>
        </l-input-field>
        <!-- endregion -->

        <!-- region Password -->
        <l-input-field
            :input-type="true"
            v-model="$v.user.password.$model"
            type="password"
            placeholder="Mot de passe ..."
            :state="validateState($v.user, 'password')"
        >
          <template #invalid-feedback>
            <invalid-feedback
                :condition="!$v.user.password.required"
                :error-message="required()"
            />
            <invalid-feedback
                :condition="!$v.user.password.minLength"
                :error-message="minLength($v.user.password.$params.minLength.min)"
            />
          </template>
        </l-input-field>
        <!-- endregion -->

        <!-- region Password 2 -->
        <l-input-field
            :input-type="true"
            v-model="$v.user.password2.$model"
            type="password"
            placeholder="Confirmer mot de passe ..."
            :state="validateState($v.user, 'password2')"
        >
          <template #invalid-feedback>
            <invalid-feedback
                :condition="!$v.user.password2.required"
                :error-message="required()"
            />
            <invalid-feedback
                :condition="!$v.user.password2.sameAsPassword"
                :error-message="sameAs()"
            />
          </template>
        </l-input-field>
        <!-- endregion -->

        <div class="mt-3">
          <b-alert variant="danger" :show="message !== ''">{{ message }}</b-alert>

          <b-button class="btn-grad" :disabled="submitStatus === 'PENDING'" @click.prevent="submit">
            <b-spinner variant="success" type="grow" small v-show="submitStatus === 'PENDING'"/>
            S'inscrire
          </b-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import LInputField from "@/components/LInputField";
import InvalidFeedback from "@/components/LInvalidFeedback";
import {validationMixin} from "vuelidate";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import {commonMixin} from "@/mixins/common.mixin";
import AuthModel from "@/models/user/auth.model";
import {htmlTitle} from "@/utils/tools";
import {mapActions} from "vuex";

export default {
  name: "Register",
  components: {LInputField, InvalidFeedback},
  mixins: [validationMixin, validationMessageMixin, commonMixin],
  validations: {
    user: AuthModel.registerValidations
  },
  title() {
    return htmlTitle('Register')
  },
  data() {
    return {
      user: new AuthModel(),
      submitStatus: null,
      message: ''
    }
  },
  methods: {
    ...mapActions({register: "Auth/register"}),
    submit: function () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        this.register(this.user.toRegisterPayload()).then(() => {
          console.log('Registering ...')
          setTimeout(() => {
            this.submitStatus = 'OK'
            this.$router.push({name: "VGRegisterSuccess", params: {fromRegister: true}});
          }, 5000)
        }, () => {
          this.message = 'Identifiants non valides, réessayez'
          this.submitStatus = 'ERROR'
          setTimeout(() => {
            this.submitStatus = null
            this.message = ""
          }, 5000)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>