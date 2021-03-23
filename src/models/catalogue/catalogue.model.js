import * as R from 'ramda'
import RayonModel from "@/models/catalogue/rayon.model";
import SectionModel from "@/models/catalogue/section.model";
import TypeProduitModel from "@/models/catalogue/type_produit.model";

export default class CatalogueModel {
    constructor(catalogue = {}) {
        this.id = R.is(Number, catalogue.id) ? catalogue.id : null
        this.rayon = R.is(String, catalogue.rayon) ? catalogue.rayon : ""
        this.section = R.is(String, catalogue.section) ? catalogue.section : ""
        this.type_produit = R.is(String, catalogue.type_produit) ? catalogue.type_produit : ""
        this.ref_rayon = R.is(Object, catalogue.ref_rayon) ? new RayonModel(catalogue.ref_rayon) : new RayonModel()
        this.ref_section = R.is(Object, catalogue.ref_section) ? new SectionModel(catalogue.ref_section) : new SectionModel()
        this.ref_type_produit = R.is(Object, catalogue.ref_type_produit) ? new TypeProduitModel(catalogue.ref_type_produit) : new TypeProduitModel()
    }

    toCreatePayload() {
        return {
            ref_rayon: this.ref_rayon.id,
            ref_section: this.ref_section.id,
            ref_type_produit: this.ref_type_produit.id
        }
    }

    toUpdatePayload() {
        return {
            ...this.toCreatePayload(),
            id: this.id
        }
    }

    static get tableFields() {
        return []
    }
}