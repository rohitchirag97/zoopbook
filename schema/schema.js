const bcrypt = require('bcryptjs');

const Company = require('../models/Company');
const User = require('../models/User');
const UserRole = require('../models/UserRole');
const CompanySetting = require('../models/CompanySetting');
const BankAccount = require('../models/BankAccount');
const WareHouse = require('../models/WareHouse');
const ProductCategory = require('../models/ProductCategory');
const Unit = require('../models/Unit');
const Product = require('../models/Product');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLSchema,
    GraphQLList,
} = require('graphql');

//Company Type
const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        nameSlug: { type: GraphQLString },
        Email: { type: GraphQLString },
        mobile: { type: GraphQLString },
        Website: { type: GraphQLString },
        address: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        pincode: { type: GraphQLString },
        telephone: { type: GraphQLString },
        Fax: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({ companyId: parent.id });
            }
        },
        userRoles: {
            type: new GraphQLList(UserRoleType),
            resolve(parent, args) {
                return UserRole.find({ companyId: parent.id });
            }
        },
        companySetting: {
            type: CompanySettingType,
            resolve(parent, args) {
                return CompanySetting.findOne({ companyId: parent.id });
            }
        },
        bankAccounts: {
            type: new GraphQLList(BankAccountType),
            resolve(parent, args) {
                return BankAccount.find({ companyId: parent.id });
            }
        },
        wareHouses: {
            type: new GraphQLList(WareHouseType),
            resolve(parent, args) {
                return WareHouse.find({ companyId: parent.id });
            }
        },
        productCategories: {
            type: new GraphQLList(ProductCategoryType),
            resolve(parent, args) {
                return ProductCategory.find({ companyId: parent.id });
            }
        },
        units: {
            type: new GraphQLList(UnitType),
            resolve(parent, args) {
                return Unit.find({ companyId: parent.id });
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return Product.find({ companyId: parent.id });
            }
        }
    })
});

// Company Setting Type
const CompanySettingType = new GraphQLObjectType({
    name: 'CompanySetting',
    fields: () => ({
        id: { type: GraphQLID },
        currency: { type: GraphQLString },
        SalesInvoicePrefix: { type: GraphQLString },
        SalesInvoiceSuffix: { type: GraphQLString },
        SalesInvoiceStartNumber: { type: GraphQLString },
        SalesInvoiceTitle: { type: GraphQLString }
    })
});

//Bank Account Type
const BankAccountType = new GraphQLObjectType({
    name: 'BankAccount',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        accountNumber: { type: GraphQLString },
        bankName: { type: GraphQLString },
        branchName: { type: GraphQLString },
        ifscCode: { type: GraphQLString }
    })
});

//WareHouse Type
const WareHouseType = new GraphQLObjectType({
    name: 'WareHouse',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        pincode: { type: GraphQLString }
    })
});

//Product Category Type
const ProductCategoryType = new GraphQLObjectType({
    name: 'ProductCategory',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return Product.find({ productcategoryId: parent.id });
            }
        }
    })
});

//Unit Type
const UnitType = new GraphQLObjectType({
    name: 'Unit',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        unitSymbol: { type: GraphQLString }
    })
});

//Product Type
const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLString },
        quantity: { type: GraphQLString },
        unit: {
            type: UnitType,
            resolve(parent, args) {
                return Unit.findById(parent.unitId);
            }
        },
        productcategory: {
            type: ProductCategoryType,
            resolve(parent, args) {
                return ProductCategory.findById(parent.productcategoryId);
            }
        }
    })
});

//User Role Type
const UserRoleType = new GraphQLObjectType({
    name: 'UserRole',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        user: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({ roleId: parent.id, companyId: parent.companyId });
            }
        }
    })
});

//User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        userRole: {
            type: UserRoleType,
            resolve(parent, args) {
                return UserRole.findById(parent.roleId);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //Company related queries
        companies: {
            type: new GraphQLList(CompanyType),
            resolve(parent, args) {
                return Company.find();
            }
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Company.findById(args.id);
            }
        },
        companybyslug: {
            type: CompanyType,
            args: { slug: { type: GraphQLString } },
            resolve(parent, args) {
                return Company.findOne({ nameSlug: args.slug });
            }
        },
        CompanySetting: {
            type: CompanySettingType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return CompanySetting.find({ companyId: args.id });
            }
        },

        //Bank Account related queries of Company
        bankAccounts: {
            type: new GraphQLList(BankAccountType),
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return BankAccount.find({ companyId: args.id });
            }
        },
        bankAccount: {
            type: BankAccountType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return BankAccount.findById(args.id);
            }
        },

        //warehouse related queries of Company
        wareHouses: {
            type: new GraphQLList(WareHouseType),
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return WareHouse.find({ companyId: args.id });
            }
        },
        wareHouse: {
            type: WareHouseType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return WareHouse.findById(args.id);
            }
        },

        //Product related queries
        productsCategories: {
            type: new GraphQLList(ProductCategoryType),
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return ProductCategory.find({ companyId: args.id });
            }
        },
        productCategory: {
            type: ProductCategoryType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return ProductCategory.findById(args.id);
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Product.find({ productcategoryId: args.id });
            }
        },
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Product.findById(args.id);
            }
        },
        //Invoice related queries

        //reports related queries

        //User related queries of company
        users: {
            type: new GraphQLList(UserType),
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.find({ companyId: args.id });
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        userroles: {
            type: new GraphQLList(UserRoleType),
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return UserRole.find({ companyId: args.id });
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //Add Mutations
        createcompany: {
            type: CompanyType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                phone: { type: GraphQLString },
                nameSlug: { type: GraphQLString }
            },
            resolve(parent, args) {
                let company = new Company({
                    name: args.name,
                    nameSlug: args.nameSlug,
                    Email: args.email,
                    mobile: args.phone
                });
                return company.save();
            }
        },
        addCompanySetting: {
            type: CompanySettingType,
            args: {
                currency: { type: GraphQLString },
                SalesInvoicePrefix: { type: GraphQLString },
                SalesInvoiceSuffix: { type: GraphQLString },
                SalesInvoiceStartNumber: { type: GraphQLString },
                SalesInvoiceTitle: { type: GraphQLString },
                companyId: { type: GraphQLID }
            },
            resolve(parent, args) {
                let companySetting = new CompanySetting({
                    currency: args.currency,
                    SalesInvoicePrefix: args.SalesInvoicePrefix,
                    SalesInvoiceSuffix: args.SalesInvoiceSuffix,
                    SalesInvoiceStartNumber: args.SalesInvoiceStartNumber,
                    SalesInvoiceTitle: args.SalesInvoiceTitle,
                    CompanyId: args.companyId
                });
                return companySetting.save();
            }
        },
        addBankAccount: {
            type: BankAccountType,
            args: {
                name: { type: GraphQLString },
                accountNumber: { type: GraphQLString },
                bankName: { type: GraphQLString },
                branchName: { type: GraphQLString },
                ifscCode: { type: GraphQLString },
                companyId: { type: GraphQLID }
            },
            resolve(parent, args) {
                let bankAccount = new BankAccount({
                    name: args.name,
                    accountNumber: args.accountNumber,
                    bankName: args.bankName,
                    branchName: args.branchName,
                    ifscCode: args.ifscCode,
                    companyId: args.companyId
                });
                return bankAccount.save();
            }
        },
        addwarehouse: {
            type: WareHouseType,
            args: {
                name: { type: GraphQLString },
                address: { type: GraphQLString },
                companyId: { type: GraphQLID },
                city: { type: GraphQLString },
                state: { type: GraphQLString },
                country: { type: GraphQLString },
                pincode: { type: GraphQLString }
            },
            resolve(parent, args) {
                let wareHouse = new WareHouse({
                    name: args.name,
                    address: args.address,
                    companyId: args.companyId,
                    city: args.city,
                    state: args.state,
                    country: args.country,
                    pincode: args.pincode
                });
                return wareHouse.save();
            }
        },
        adduserrole: {
            type: UserRoleType,
            args: {
                name: { type: GraphQLString },
                companyId: { type: GraphQLID }
            },
            resolve(parent, args) {
                let userRole = new UserRole({
                    name: args.name,
                    companyId: args.companyId
                });
                return userRole.save();
            }
        },
        adduser: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                companyId: { type: GraphQLID },
                roleId: { type: GraphQLID }
            },
            resolve(parent, args) {
                let user = new User({
                    name: args.name,
                    email: args.email,
                    password: bcrypt.hashSync(args.password, 10),
                    companyId: args.companyId,
                    roleId: args.roleId
                });
                return user.save();
            }
        },
        addproductcategory: {
            type: ProductCategoryType,
            args: {
                name: { type: GraphQLString },
                companyId: { type: GraphQLID }
            },
            resolve(parent, args) {
                let productCategory = new ProductCategory({
                    name: args.name,
                    companyId: args.companyId
                });
                return productCategory.save();
            }
        },
        addUnit: {
            type: UnitType,
            args: {
                name: { type: GraphQLString },
                companyId: { type: GraphQLID },
                unitSymbol: { type: GraphQLString }
            },
            resolve(parent, args) {
                let unit = new Unit({
                    name: args.name,
                    companyId: args.companyId,
                    unitSymbol: args.unitSymbol
                });
                return unit.save();
            }
        },
        addproduct: {
            type: ProductType,
            args: {
                name: { type: GraphQLString },
                companyId: { type: GraphQLID },
                productCategoryId: { type: GraphQLID },
                hsnsacCode: { type: GraphQLString },
                price: { type: GraphQLFloat },
                quantity: { type: GraphQLInt },
                description: { type: GraphQLString },
                unitId: { type: GraphQLID },
                igst: { type: GraphQLFloat },
                sgst: { type: GraphQLFloat },
                cgst: { type: GraphQLFloat }
            },
            resolve(parent, args) {
                let product = new Product({
                    name: args.name,
                    companyId: args.companyId,
                    productcategoryId: args.productCategoryId,
                    price: args.price,
                    quantity: args.quantity,
                    description: args.description,
                    unitId: args.unitId,
                    hsnsaccode: args.hsnsacCode,
                    igst: args.igst,
                    sgst: args.sgst,
                    cgst: args.cgst
                });
                return product.save();
            }
        },

        //Update Mutations
        updatecompany: {
            type: CompanyType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                phone: { type: GraphQLString },
                nameSlug: { type: GraphQLString },
                website: { type: GraphQLString },
                address: { type: GraphQLString },
                state: { type: GraphQLString },
                country: { type: GraphQLString },
                pincode: { type: GraphQLString },
                telephone: { type: GraphQLString },
                fax: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Company.findByIdAndUpdate(args.id, {
                    $set: {
                        name: args.name,
                        nameSlug: args.nameSlug,
                        Email: args.email,
                        mobile: args.phone,
                        Website: args.website,
                        address: args.address,
                        state: args.state,
                        country: args.country,
                        pincode: args.pincode,
                        telephone: args.telephone,
                        fax: args.fax
                    }
                }, { new: true });
            }
        },

        //Delete Mutations
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
});