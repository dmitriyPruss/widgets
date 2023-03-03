/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@nestjs/config/dist/config-host.module.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigHostModule = void 0;
const common_1 = __webpack_require__("@nestjs/common");
const config_constants_1 = __webpack_require__("./node_modules/@nestjs/config/dist/config.constants.js");
const config_service_1 = __webpack_require__("./node_modules/@nestjs/config/dist/config.service.js");
let ConfigHostModule = class ConfigHostModule {
};
ConfigHostModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            {
                provide: config_constants_1.CONFIGURATION_TOKEN,
                useFactory: () => ({}),
            },
            {
                provide: config_constants_1.CONFIGURATION_SERVICE_TOKEN,
                useClass: config_service_1.ConfigService,
            },
        ],
        exports: [config_constants_1.CONFIGURATION_TOKEN, config_constants_1.CONFIGURATION_SERVICE_TOKEN],
    })
], ConfigHostModule);
exports.ConfigHostModule = ConfigHostModule;


/***/ }),

/***/ "./node_modules/@nestjs/config/dist/config.constants.js":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AS_PROVIDER_METHOD_KEY = exports.VALIDATED_ENV_PROPNAME = exports.PARTIAL_CONFIGURATION_PROPNAME = exports.PARTIAL_CONFIGURATION_KEY = exports.VALIDATED_ENV_LOADER = exports.CONFIGURATION_LOADER = exports.CONFIGURATION_TOKEN = exports.CONFIGURATION_SERVICE_TOKEN = void 0;
/**
 * Injection tokens
 */
exports.CONFIGURATION_SERVICE_TOKEN = Symbol('CONFIG_SERVICE');
exports.CONFIGURATION_TOKEN = 'CONFIGURATION_TOKEN';
exports.CONFIGURATION_LOADER = 'CONFIGURATION_LOADER';
exports.VALIDATED_ENV_LOADER = 'VALIDATED_ENV_LOADER';
exports.PARTIAL_CONFIGURATION_KEY = 'PARTIAL_CONFIGURATION_KEY';
exports.PARTIAL_CONFIGURATION_PROPNAME = 'KEY';
exports.VALIDATED_ENV_PROPNAME = '_PROCESS_ENV_VALIDATED';
exports.AS_PROVIDER_METHOD_KEY = 'asProvider';


/***/ }),

/***/ "./node_modules/@nestjs/config/dist/config.module.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var ConfigModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigModule = void 0;
const common_1 = __webpack_require__("@nestjs/common");
const shared_utils_1 = __webpack_require__("@nestjs/common/utils/shared.utils");
const dotenv = __importStar(__webpack_require__("dotenv"));
const dotenv_expand_1 = __webpack_require__("dotenv-expand");
const fs = __importStar(__webpack_require__("fs"));
const path_1 = __webpack_require__("path");
const config_host_module_1 = __webpack_require__("./node_modules/@nestjs/config/dist/config-host.module.js");
const config_constants_1 = __webpack_require__("./node_modules/@nestjs/config/dist/config.constants.js");
const config_service_1 = __webpack_require__("./node_modules/@nestjs/config/dist/config.service.js");
const create_config_factory_util_1 = __webpack_require__("./node_modules/@nestjs/config/dist/utils/create-config-factory.util.js");
const get_registration_token_util_1 = __webpack_require__("./node_modules/@nestjs/config/dist/utils/get-registration-token.util.js");
const merge_configs_util_1 = __webpack_require__("./node_modules/@nestjs/config/dist/utils/merge-configs.util.js");
let ConfigModule = ConfigModule_1 = class ConfigModule {
    /**
     * This promise resolves when "dotenv" completes loading environment variables.
     * When "ignoreEnvFile" is set to true, then it will resolve immediately after the
     * "ConfigModule#forRoot" method is called.
     */
    static get envVariablesLoaded() {
        return this._envVariablesLoaded;
    }
    /**
     * Loads process environment variables depending on the "ignoreEnvFile" flag and "envFilePath" value.
     * Also, registers custom configurations globally.
     * @param options
     */
    static forRoot(options = {}) {
        let validatedEnvConfig = undefined;
        let config = options.ignoreEnvFile ? {} : this.loadEnvFile(options);
        if (!options.ignoreEnvVars) {
            config = Object.assign(Object.assign({}, config), process.env);
        }
        if (options.validate) {
            const validatedConfig = options.validate(config);
            validatedEnvConfig = validatedConfig;
            this.assignVariablesToProcess(validatedConfig);
        }
        else if (options.validationSchema) {
            const validationOptions = this.getSchemaValidationOptions(options);
            const { error, value: validatedConfig } = options.validationSchema.validate(config, validationOptions);
            if (error) {
                throw new Error(`Config validation error: ${error.message}`);
            }
            validatedEnvConfig = validatedConfig;
            this.assignVariablesToProcess(validatedConfig);
        }
        else {
            this.assignVariablesToProcess(config);
        }
        const isConfigToLoad = options.load && options.load.length;
        const providers = (options.load || [])
            .map(factory => (0, create_config_factory_util_1.createConfigProvider)(factory))
            .filter(item => item);
        const configProviderTokens = providers.map(item => item.provide);
        const configServiceProvider = {
            provide: config_service_1.ConfigService,
            useFactory: (configService) => {
                if (options.cache) {
                    configService.isCacheEnabled = true;
                }
                return configService;
            },
            inject: [config_constants_1.CONFIGURATION_SERVICE_TOKEN, ...configProviderTokens],
        };
        providers.push(configServiceProvider);
        if (validatedEnvConfig) {
            const validatedEnvConfigLoader = {
                provide: config_constants_1.VALIDATED_ENV_LOADER,
                useFactory: (host) => {
                    host[config_constants_1.VALIDATED_ENV_PROPNAME] = validatedEnvConfig;
                },
                inject: [config_constants_1.CONFIGURATION_TOKEN],
            };
            providers.push(validatedEnvConfigLoader);
        }
        this.environmentVariablesLoadedSignal();
        return {
            module: ConfigModule_1,
            global: options.isGlobal,
            providers: isConfigToLoad
                ? [
                    ...providers,
                    {
                        provide: config_constants_1.CONFIGURATION_LOADER,
                        useFactory: (host, ...configurations) => {
                            configurations.forEach((item, index) => this.mergePartial(host, item, providers[index]));
                        },
                        inject: [config_constants_1.CONFIGURATION_TOKEN, ...configProviderTokens],
                    },
                ]
                : providers,
            exports: [config_service_1.ConfigService, ...configProviderTokens],
        };
    }
    /**
     * Registers configuration object (partial registration).
     * @param config
     */
    static forFeature(config) {
        const configProvider = (0, create_config_factory_util_1.createConfigProvider)(config);
        const serviceProvider = {
            provide: config_service_1.ConfigService,
            useFactory: (configService) => configService,
            inject: [config_constants_1.CONFIGURATION_SERVICE_TOKEN, configProvider.provide],
        };
        return {
            module: ConfigModule_1,
            providers: [
                configProvider,
                serviceProvider,
                {
                    provide: config_constants_1.CONFIGURATION_LOADER,
                    useFactory: (host, partialConfig) => {
                        this.mergePartial(host, partialConfig, configProvider);
                    },
                    inject: [config_constants_1.CONFIGURATION_TOKEN, configProvider.provide],
                },
            ],
            exports: [config_service_1.ConfigService, configProvider.provide],
        };
    }
    static loadEnvFile(options) {
        const envFilePaths = Array.isArray(options.envFilePath)
            ? options.envFilePath
            : [options.envFilePath || (0, path_1.resolve)(process.cwd(), '.env')];
        let config = {};
        for (const envFilePath of envFilePaths) {
            if (fs.existsSync(envFilePath)) {
                config = Object.assign(dotenv.parse(fs.readFileSync(envFilePath)), config);
                if (options.expandVariables) {
                    const expandOptions = typeof options.expandVariables === 'object' ? options.expandVariables : {};
                    config = (0, dotenv_expand_1.expand)(Object.assign(Object.assign({}, expandOptions), { parsed: config })).parsed || config;
                }
            }
        }
        return config;
    }
    static assignVariablesToProcess(config) {
        if (!(0, shared_utils_1.isObject)(config)) {
            return;
        }
        const keys = Object.keys(config).filter(key => !(key in process.env));
        keys.forEach(key => (process.env[key] = config[key]));
    }
    static mergePartial(host, item, provider) {
        const factoryRef = provider.useFactory;
        const token = (0, get_registration_token_util_1.getRegistrationToken)(factoryRef);
        (0, merge_configs_util_1.mergeConfigObject)(host, item, token);
    }
    static getSchemaValidationOptions(options) {
        if (options.validationOptions) {
            if (typeof options.validationOptions.allowUnknown === 'undefined') {
                options.validationOptions.allowUnknown = true;
            }
            return options.validationOptions;
        }
        return {
            abortEarly: false,
            allowUnknown: true,
        };
    }
};
ConfigModule._envVariablesLoaded = new Promise(resolve => (ConfigModule_1.environmentVariablesLoadedSignal = resolve));
ConfigModule = ConfigModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [config_host_module_1.ConfigHostModule],
        providers: [
            {
                provide: config_service_1.ConfigService,
                useExisting: config_constants_1.CONFIGURATION_SERVICE_TOKEN,
            },
        ],
        exports: [config_host_module_1.ConfigHostModule, config_service_1.ConfigService],
    })
], ConfigModule);
exports.ConfigModule = ConfigModule;


/***/ }),

/***/ "./node_modules/@nestjs/config/dist/config.service.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigService = void 0;
const common_1 = __webpack_require__("@nestjs/common");
const shared_utils_1 = __webpack_require__("@nestjs/common/utils/shared.utils");
const lodash_1 = __webpack_require__("lodash");
const config_constants_1 = __webpack_require__("./node_modules/@nestjs/config/dist/config.constants.js");
let ConfigService = class ConfigService {
    constructor(internalConfig = {}) {
        this.internalConfig = internalConfig;
        this.cache = {};
        this._isCacheEnabled = false;
    }
    set isCacheEnabled(value) {
        this._isCacheEnabled = value;
    }
    get isCacheEnabled() {
        return this._isCacheEnabled;
    }
    /**
     * Get a configuration value (either custom configuration or process environment variable)
     * based on property path (you can use dot notation to traverse nested object, e.g. "database.host").
     * It returns a default value if the key does not exist.
     * @param propertyPath
     * @param defaultValueOrOptions
     */
    get(propertyPath, defaultValueOrOptions, options) {
        const validatedEnvValue = this.getFromValidatedEnv(propertyPath);
        if (!(0, shared_utils_1.isUndefined)(validatedEnvValue)) {
            return validatedEnvValue;
        }
        const defaultValue = this.isGetOptionsObject(defaultValueOrOptions) && !options
            ? undefined
            : defaultValueOrOptions;
        const processEnvValue = this.getFromProcessEnv(propertyPath, defaultValue);
        if (!(0, shared_utils_1.isUndefined)(processEnvValue)) {
            return processEnvValue;
        }
        const internalValue = this.getFromInternalConfig(propertyPath);
        if (!(0, shared_utils_1.isUndefined)(internalValue)) {
            return internalValue;
        }
        return defaultValue;
    }
    /**
     * Get a configuration value (either custom configuration or process environment variable)
     * based on property path (you can use dot notation to traverse nested object, e.g. "database.host").
     * It returns a default value if the key does not exist.
     * If the default value is undefined an exception will be thrown.
     * @param propertyPath
     * @param defaultValueOrOptions
     */
    getOrThrow(propertyPath, defaultValueOrOptions, options) {
        // @ts-expect-error Bypass method overloads
        const value = this.get(propertyPath, defaultValueOrOptions, options);
        if ((0, shared_utils_1.isUndefined)(value)) {
            throw new TypeError(`Configuration key "${propertyPath.toString()}" does not exist`);
        }
        return value;
    }
    getFromCache(propertyPath, defaultValue) {
        const cachedValue = (0, lodash_1.get)(this.cache, propertyPath);
        return (0, shared_utils_1.isUndefined)(cachedValue)
            ? defaultValue
            : cachedValue;
    }
    getFromValidatedEnv(propertyPath) {
        const validatedEnvValue = (0, lodash_1.get)(this.internalConfig[config_constants_1.VALIDATED_ENV_PROPNAME], propertyPath);
        return validatedEnvValue;
    }
    getFromProcessEnv(propertyPath, defaultValue) {
        if (this.isCacheEnabled &&
            (0, lodash_1.has)(this.cache, propertyPath)) {
            const cachedValue = this.getFromCache(propertyPath, defaultValue);
            return !(0, shared_utils_1.isUndefined)(cachedValue) ? cachedValue : defaultValue;
        }
        const processValue = (0, lodash_1.get)(process.env, propertyPath);
        this.setInCacheIfDefined(propertyPath, processValue);
        return processValue;
    }
    getFromInternalConfig(propertyPath) {
        const internalValue = (0, lodash_1.get)(this.internalConfig, propertyPath);
        return internalValue;
    }
    setInCacheIfDefined(propertyPath, value) {
        if (typeof value === 'undefined') {
            return;
        }
        (0, lodash_1.set)(this.cache, propertyPath, value);
    }
    isGetOptionsObject(options) {
        return options && (options === null || options === void 0 ? void 0 : options.infer) && Object.keys(options).length === 1;
    }
};
ConfigService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Optional)()),
    __param(0, (0, common_1.Inject)(config_constants_1.CONFIGURATION_TOKEN)),
    __metadata("design:paramtypes", [Object])
], ConfigService);
exports.ConfigService = ConfigService;


/***/ }),

/***/ "./node_modules/@nestjs/config/dist/index.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__("./node_modules/@nestjs/config/dist/config.module.js"), exports);
__exportStar(__webpack_require__("./node_modules/@nestjs/config/dist/config.service.js"), exports);
__exportStar(__webpack_require__("./node_modules/@nestjs/config/dist/types/index.js"), exports);
__exportStar(__webpack_require__("./node_modules/@nestjs/config/dist/utils/index.js"), exports);
__exportStar(__webpack_require__("./node_modules/@nestjs/config/dist/interfaces/index.js"), exports);


/***/ }),

/***/ "./node_modules/@nestjs/config/dist/interfaces/config-factory.interface.js":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./node_modules/@nestjs/config/dist/interfaces/config-module-options.interface.js":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./node_modules/@nestjs/config/dist/interfaces/index.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__("./node_modules/@nestjs/config/dist/interfaces/config-factory.interface.js"), exports);
__exportStar(__webpack_require__("./node_modules/@nestjs/config/dist/interfaces/config-module-options.interface.js"), exports);


/***/ }),

/***/ "./node_modules/@nestjs/config/dist/types/config-object.type.js":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./node_modules/@nestjs/config/dist/types/config.type.js":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./node_modules/@nestjs/config/dist/types/index.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__("./node_modules/@nestjs/config/dist/types/config-object.type.js"), exports);
__exportStar(__webpack_require__("./node_modules/@nestjs/config/dist/types/config.type.js"), exports);
__exportStar(__webpack_require__("./node_modules/@nestjs/config/dist/types/no-infer.type.js"), exports);
__exportStar(__webpack_require__("./node_modules/@nestjs/config/dist/types/path-value.type.js"), exports);


/***/ }),

/***/ "./node_modules/@nestjs/config/dist/types/no-infer.type.js":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./node_modules/@nestjs/config/dist/types/path-value.type.js":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./node_modules/@nestjs/config/dist/utils/create-config-factory.util.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createConfigProvider = void 0;
const uuid_1 = __webpack_require__("uuid");
const get_config_token_util_1 = __webpack_require__("./node_modules/@nestjs/config/dist/utils/get-config-token.util.js");
function createConfigProvider(factory) {
    return {
        provide: factory.KEY || (0, get_config_token_util_1.getConfigToken)((0, uuid_1.v4)()),
        useFactory: factory,
        inject: [],
    };
}
exports.createConfigProvider = createConfigProvider;


/***/ }),

/***/ "./node_modules/@nestjs/config/dist/utils/get-config-token.util.js":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getConfigToken = void 0;
function getConfigToken(token) {
    return `CONFIGURATION(${token})`;
}
exports.getConfigToken = getConfigToken;


/***/ }),

/***/ "./node_modules/@nestjs/config/dist/utils/get-registration-token.util.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRegistrationToken = void 0;
const config_constants_1 = __webpack_require__("./node_modules/@nestjs/config/dist/config.constants.js");
function getRegistrationToken(config) {
    return config[config_constants_1.PARTIAL_CONFIGURATION_KEY];
}
exports.getRegistrationToken = getRegistrationToken;


/***/ }),

/***/ "./node_modules/@nestjs/config/dist/utils/index.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__("./node_modules/@nestjs/config/dist/utils/register-as.util.js"), exports);
__exportStar(__webpack_require__("./node_modules/@nestjs/config/dist/utils/get-config-token.util.js"), exports);


/***/ }),

/***/ "./node_modules/@nestjs/config/dist/utils/merge-configs.util.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mergeConfigObject = void 0;
const lodash_1 = __webpack_require__("lodash");
function mergeConfigObject(host, partial, token) {
    if (token) {
        (0, lodash_1.set)(host, token, partial);
        return partial;
    }
    Object.assign(host, partial);
}
exports.mergeConfigObject = mergeConfigObject;


/***/ }),

/***/ "./node_modules/@nestjs/config/dist/utils/register-as.util.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerAs = void 0;
const __1 = __webpack_require__("./node_modules/@nestjs/config/dist/index.js");
const config_constants_1 = __webpack_require__("./node_modules/@nestjs/config/dist/config.constants.js");
const get_config_token_util_1 = __webpack_require__("./node_modules/@nestjs/config/dist/utils/get-config-token.util.js");
/**
 * Registers the configuration object behind a specified token.
 */
function registerAs(token, configFactory) {
    const defineProperty = (key, value) => {
        Object.defineProperty(configFactory, key, {
            configurable: false,
            enumerable: false,
            value,
            writable: false,
        });
    };
    defineProperty(config_constants_1.PARTIAL_CONFIGURATION_KEY, token);
    defineProperty(config_constants_1.PARTIAL_CONFIGURATION_PROPNAME, (0, get_config_token_util_1.getConfigToken)(token));
    defineProperty(config_constants_1.AS_PROVIDER_METHOD_KEY, () => ({
        imports: [__1.ConfigModule.forFeature(configFactory)],
        useFactory: (config) => config,
        inject: [(0, get_config_token_util_1.getConfigToken)(token)],
    }));
    return configFactory;
}
exports.registerAs = registerAs;


/***/ }),

/***/ "./node_modules/@nestjs/config/index.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(__webpack_require__("./node_modules/@nestjs/config/dist/index.js"));


/***/ }),

/***/ "../../libs/data/node_modules/@nestjs/config/dist/config-host.module.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigHostModule = void 0;
const common_1 = __webpack_require__("@nestjs/common");
const config_constants_1 = __webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/config.constants.js");
const config_service_1 = __webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/config.service.js");
let ConfigHostModule = class ConfigHostModule {
};
ConfigHostModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            {
                provide: config_constants_1.CONFIGURATION_TOKEN,
                useFactory: () => ({}),
            },
            {
                provide: config_constants_1.CONFIGURATION_SERVICE_TOKEN,
                useClass: config_service_1.ConfigService,
            },
        ],
        exports: [config_constants_1.CONFIGURATION_TOKEN, config_constants_1.CONFIGURATION_SERVICE_TOKEN],
    })
], ConfigHostModule);
exports.ConfigHostModule = ConfigHostModule;


/***/ }),

/***/ "../../libs/data/node_modules/@nestjs/config/dist/config.constants.js":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AS_PROVIDER_METHOD_KEY = exports.VALIDATED_ENV_PROPNAME = exports.PARTIAL_CONFIGURATION_PROPNAME = exports.PARTIAL_CONFIGURATION_KEY = exports.VALIDATED_ENV_LOADER = exports.CONFIGURATION_LOADER = exports.CONFIGURATION_TOKEN = exports.CONFIGURATION_SERVICE_TOKEN = void 0;
/**
 * Injection tokens
 */
exports.CONFIGURATION_SERVICE_TOKEN = Symbol('CONFIG_SERVICE');
exports.CONFIGURATION_TOKEN = 'CONFIGURATION_TOKEN';
exports.CONFIGURATION_LOADER = 'CONFIGURATION_LOADER';
exports.VALIDATED_ENV_LOADER = 'VALIDATED_ENV_LOADER';
exports.PARTIAL_CONFIGURATION_KEY = 'PARTIAL_CONFIGURATION_KEY';
exports.PARTIAL_CONFIGURATION_PROPNAME = 'KEY';
exports.VALIDATED_ENV_PROPNAME = '_PROCESS_ENV_VALIDATED';
exports.AS_PROVIDER_METHOD_KEY = 'asProvider';


/***/ }),

/***/ "../../libs/data/node_modules/@nestjs/config/dist/config.module.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var ConfigModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigModule = void 0;
const common_1 = __webpack_require__("@nestjs/common");
const shared_utils_1 = __webpack_require__("@nestjs/common/utils/shared.utils");
const dotenv = __importStar(__webpack_require__("dotenv"));
const dotenv_expand_1 = __webpack_require__("dotenv-expand");
const fs = __importStar(__webpack_require__("fs"));
const path_1 = __webpack_require__("path");
const config_host_module_1 = __webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/config-host.module.js");
const config_constants_1 = __webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/config.constants.js");
const config_service_1 = __webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/config.service.js");
const create_config_factory_util_1 = __webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/utils/create-config-factory.util.js");
const get_registration_token_util_1 = __webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/utils/get-registration-token.util.js");
const merge_configs_util_1 = __webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/utils/merge-configs.util.js");
let ConfigModule = ConfigModule_1 = class ConfigModule {
    /**
     * This promise resolves when "dotenv" completes loading environment variables.
     * When "ignoreEnvFile" is set to true, then it will resolve immediately after the
     * "ConfigModule#forRoot" method is called.
     */
    static get envVariablesLoaded() {
        return this._envVariablesLoaded;
    }
    /**
     * Loads process environment variables depending on the "ignoreEnvFile" flag and "envFilePath" value.
     * Also, registers custom configurations globally.
     * @param options
     */
    static forRoot(options = {}) {
        let validatedEnvConfig = undefined;
        let config = options.ignoreEnvFile ? {} : this.loadEnvFile(options);
        if (!options.ignoreEnvVars) {
            config = Object.assign(Object.assign({}, config), process.env);
        }
        if (options.validate) {
            const validatedConfig = options.validate(config);
            validatedEnvConfig = validatedConfig;
            this.assignVariablesToProcess(validatedConfig);
        }
        else if (options.validationSchema) {
            const validationOptions = this.getSchemaValidationOptions(options);
            const { error, value: validatedConfig } = options.validationSchema.validate(config, validationOptions);
            if (error) {
                throw new Error(`Config validation error: ${error.message}`);
            }
            validatedEnvConfig = validatedConfig;
            this.assignVariablesToProcess(validatedConfig);
        }
        else {
            this.assignVariablesToProcess(config);
        }
        const isConfigToLoad = options.load && options.load.length;
        const providers = (options.load || [])
            .map(factory => (0, create_config_factory_util_1.createConfigProvider)(factory))
            .filter(item => item);
        const configProviderTokens = providers.map(item => item.provide);
        const configServiceProvider = {
            provide: config_service_1.ConfigService,
            useFactory: (configService) => {
                if (options.cache) {
                    configService.isCacheEnabled = true;
                }
                return configService;
            },
            inject: [config_constants_1.CONFIGURATION_SERVICE_TOKEN, ...configProviderTokens],
        };
        providers.push(configServiceProvider);
        if (validatedEnvConfig) {
            const validatedEnvConfigLoader = {
                provide: config_constants_1.VALIDATED_ENV_LOADER,
                useFactory: (host) => {
                    host[config_constants_1.VALIDATED_ENV_PROPNAME] = validatedEnvConfig;
                },
                inject: [config_constants_1.CONFIGURATION_TOKEN],
            };
            providers.push(validatedEnvConfigLoader);
        }
        this.environmentVariablesLoadedSignal();
        return {
            module: ConfigModule_1,
            global: options.isGlobal,
            providers: isConfigToLoad
                ? [
                    ...providers,
                    {
                        provide: config_constants_1.CONFIGURATION_LOADER,
                        useFactory: (host, ...configurations) => {
                            configurations.forEach((item, index) => this.mergePartial(host, item, providers[index]));
                        },
                        inject: [config_constants_1.CONFIGURATION_TOKEN, ...configProviderTokens],
                    },
                ]
                : providers,
            exports: [config_service_1.ConfigService, ...configProviderTokens],
        };
    }
    /**
     * Registers configuration object (partial registration).
     * @param config
     */
    static forFeature(config) {
        const configProvider = (0, create_config_factory_util_1.createConfigProvider)(config);
        const serviceProvider = {
            provide: config_service_1.ConfigService,
            useFactory: (configService) => configService,
            inject: [config_constants_1.CONFIGURATION_SERVICE_TOKEN, configProvider.provide],
        };
        return {
            module: ConfigModule_1,
            providers: [
                configProvider,
                serviceProvider,
                {
                    provide: config_constants_1.CONFIGURATION_LOADER,
                    useFactory: (host, partialConfig) => {
                        this.mergePartial(host, partialConfig, configProvider);
                    },
                    inject: [config_constants_1.CONFIGURATION_TOKEN, configProvider.provide],
                },
            ],
            exports: [config_service_1.ConfigService, configProvider.provide],
        };
    }
    static loadEnvFile(options) {
        const envFilePaths = Array.isArray(options.envFilePath)
            ? options.envFilePath
            : [options.envFilePath || (0, path_1.resolve)(process.cwd(), '.env')];
        let config = {};
        for (const envFilePath of envFilePaths) {
            if (fs.existsSync(envFilePath)) {
                config = Object.assign(dotenv.parse(fs.readFileSync(envFilePath)), config);
                if (options.expandVariables) {
                    const expandOptions = typeof options.expandVariables === 'object' ? options.expandVariables : {};
                    config = (0, dotenv_expand_1.expand)(Object.assign(Object.assign({}, expandOptions), { parsed: config })).parsed || config;
                }
            }
        }
        return config;
    }
    static assignVariablesToProcess(config) {
        if (!(0, shared_utils_1.isObject)(config)) {
            return;
        }
        const keys = Object.keys(config).filter(key => !(key in process.env));
        keys.forEach(key => (process.env[key] = config[key]));
    }
    static mergePartial(host, item, provider) {
        const factoryRef = provider.useFactory;
        const token = (0, get_registration_token_util_1.getRegistrationToken)(factoryRef);
        (0, merge_configs_util_1.mergeConfigObject)(host, item, token);
    }
    static getSchemaValidationOptions(options) {
        if (options.validationOptions) {
            if (typeof options.validationOptions.allowUnknown === 'undefined') {
                options.validationOptions.allowUnknown = true;
            }
            return options.validationOptions;
        }
        return {
            abortEarly: false,
            allowUnknown: true,
        };
    }
};
ConfigModule._envVariablesLoaded = new Promise(resolve => (ConfigModule_1.environmentVariablesLoadedSignal = resolve));
ConfigModule = ConfigModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [config_host_module_1.ConfigHostModule],
        providers: [
            {
                provide: config_service_1.ConfigService,
                useExisting: config_constants_1.CONFIGURATION_SERVICE_TOKEN,
            },
        ],
        exports: [config_host_module_1.ConfigHostModule, config_service_1.ConfigService],
    })
], ConfigModule);
exports.ConfigModule = ConfigModule;


/***/ }),

/***/ "../../libs/data/node_modules/@nestjs/config/dist/config.service.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigService = void 0;
const common_1 = __webpack_require__("@nestjs/common");
const shared_utils_1 = __webpack_require__("@nestjs/common/utils/shared.utils");
const lodash_1 = __webpack_require__("lodash");
const config_constants_1 = __webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/config.constants.js");
let ConfigService = class ConfigService {
    constructor(internalConfig = {}) {
        this.internalConfig = internalConfig;
        this.cache = {};
        this._isCacheEnabled = false;
    }
    set isCacheEnabled(value) {
        this._isCacheEnabled = value;
    }
    get isCacheEnabled() {
        return this._isCacheEnabled;
    }
    /**
     * Get a configuration value (either custom configuration or process environment variable)
     * based on property path (you can use dot notation to traverse nested object, e.g. "database.host").
     * It returns a default value if the key does not exist.
     * @param propertyPath
     * @param defaultValueOrOptions
     */
    get(propertyPath, defaultValueOrOptions, options) {
        const validatedEnvValue = this.getFromValidatedEnv(propertyPath);
        if (!(0, shared_utils_1.isUndefined)(validatedEnvValue)) {
            return validatedEnvValue;
        }
        const defaultValue = this.isGetOptionsObject(defaultValueOrOptions) && !options
            ? undefined
            : defaultValueOrOptions;
        const processEnvValue = this.getFromProcessEnv(propertyPath, defaultValue);
        if (!(0, shared_utils_1.isUndefined)(processEnvValue)) {
            return processEnvValue;
        }
        const internalValue = this.getFromInternalConfig(propertyPath);
        if (!(0, shared_utils_1.isUndefined)(internalValue)) {
            return internalValue;
        }
        return defaultValue;
    }
    /**
     * Get a configuration value (either custom configuration or process environment variable)
     * based on property path (you can use dot notation to traverse nested object, e.g. "database.host").
     * It returns a default value if the key does not exist.
     * If the default value is undefined an exception will be thrown.
     * @param propertyPath
     * @param defaultValueOrOptions
     */
    getOrThrow(propertyPath, defaultValueOrOptions, options) {
        // @ts-expect-error Bypass method overloads
        const value = this.get(propertyPath, defaultValueOrOptions, options);
        if ((0, shared_utils_1.isUndefined)(value)) {
            throw new TypeError(`Configuration key "${propertyPath.toString()}" does not exist`);
        }
        return value;
    }
    getFromCache(propertyPath, defaultValue) {
        const cachedValue = (0, lodash_1.get)(this.cache, propertyPath);
        return (0, shared_utils_1.isUndefined)(cachedValue)
            ? defaultValue
            : cachedValue;
    }
    getFromValidatedEnv(propertyPath) {
        const validatedEnvValue = (0, lodash_1.get)(this.internalConfig[config_constants_1.VALIDATED_ENV_PROPNAME], propertyPath);
        return validatedEnvValue;
    }
    getFromProcessEnv(propertyPath, defaultValue) {
        if (this.isCacheEnabled &&
            (0, lodash_1.has)(this.cache, propertyPath)) {
            const cachedValue = this.getFromCache(propertyPath, defaultValue);
            return !(0, shared_utils_1.isUndefined)(cachedValue) ? cachedValue : defaultValue;
        }
        const processValue = (0, lodash_1.get)(process.env, propertyPath);
        this.setInCacheIfDefined(propertyPath, processValue);
        return processValue;
    }
    getFromInternalConfig(propertyPath) {
        const internalValue = (0, lodash_1.get)(this.internalConfig, propertyPath);
        return internalValue;
    }
    setInCacheIfDefined(propertyPath, value) {
        if (typeof value === 'undefined') {
            return;
        }
        (0, lodash_1.set)(this.cache, propertyPath, value);
    }
    isGetOptionsObject(options) {
        return options && (options === null || options === void 0 ? void 0 : options.infer) && Object.keys(options).length === 1;
    }
};
ConfigService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Optional)()),
    __param(0, (0, common_1.Inject)(config_constants_1.CONFIGURATION_TOKEN)),
    __metadata("design:paramtypes", [Object])
], ConfigService);
exports.ConfigService = ConfigService;


/***/ }),

/***/ "../../libs/data/node_modules/@nestjs/config/dist/index.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/config.module.js"), exports);
__exportStar(__webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/config.service.js"), exports);
__exportStar(__webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/types/index.js"), exports);
__exportStar(__webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/utils/index.js"), exports);
__exportStar(__webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/interfaces/index.js"), exports);


/***/ }),

/***/ "../../libs/data/node_modules/@nestjs/config/dist/interfaces/config-factory.interface.js":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../libs/data/node_modules/@nestjs/config/dist/interfaces/config-module-options.interface.js":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../libs/data/node_modules/@nestjs/config/dist/interfaces/index.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/interfaces/config-factory.interface.js"), exports);
__exportStar(__webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/interfaces/config-module-options.interface.js"), exports);


/***/ }),

/***/ "../../libs/data/node_modules/@nestjs/config/dist/types/config-object.type.js":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../libs/data/node_modules/@nestjs/config/dist/types/config.type.js":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../libs/data/node_modules/@nestjs/config/dist/types/index.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/types/config-object.type.js"), exports);
__exportStar(__webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/types/config.type.js"), exports);
__exportStar(__webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/types/no-infer.type.js"), exports);
__exportStar(__webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/types/path-value.type.js"), exports);


/***/ }),

/***/ "../../libs/data/node_modules/@nestjs/config/dist/types/no-infer.type.js":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../libs/data/node_modules/@nestjs/config/dist/types/path-value.type.js":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../libs/data/node_modules/@nestjs/config/dist/utils/create-config-factory.util.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createConfigProvider = void 0;
const uuid_1 = __webpack_require__("uuid");
const get_config_token_util_1 = __webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/utils/get-config-token.util.js");
function createConfigProvider(factory) {
    return {
        provide: factory.KEY || (0, get_config_token_util_1.getConfigToken)((0, uuid_1.v4)()),
        useFactory: factory,
        inject: [],
    };
}
exports.createConfigProvider = createConfigProvider;


/***/ }),

/***/ "../../libs/data/node_modules/@nestjs/config/dist/utils/get-config-token.util.js":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getConfigToken = void 0;
function getConfigToken(token) {
    return `CONFIGURATION(${token})`;
}
exports.getConfigToken = getConfigToken;


/***/ }),

/***/ "../../libs/data/node_modules/@nestjs/config/dist/utils/get-registration-token.util.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRegistrationToken = void 0;
const config_constants_1 = __webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/config.constants.js");
function getRegistrationToken(config) {
    return config[config_constants_1.PARTIAL_CONFIGURATION_KEY];
}
exports.getRegistrationToken = getRegistrationToken;


/***/ }),

/***/ "../../libs/data/node_modules/@nestjs/config/dist/utils/index.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/utils/register-as.util.js"), exports);
__exportStar(__webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/utils/get-config-token.util.js"), exports);


/***/ }),

/***/ "../../libs/data/node_modules/@nestjs/config/dist/utils/merge-configs.util.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mergeConfigObject = void 0;
const lodash_1 = __webpack_require__("lodash");
function mergeConfigObject(host, partial, token) {
    if (token) {
        (0, lodash_1.set)(host, token, partial);
        return partial;
    }
    Object.assign(host, partial);
}
exports.mergeConfigObject = mergeConfigObject;


/***/ }),

/***/ "../../libs/data/node_modules/@nestjs/config/dist/utils/register-as.util.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerAs = void 0;
const __1 = __webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/index.js");
const config_constants_1 = __webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/config.constants.js");
const get_config_token_util_1 = __webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/utils/get-config-token.util.js");
/**
 * Registers the configuration object behind a specified token.
 */
function registerAs(token, configFactory) {
    const defineProperty = (key, value) => {
        Object.defineProperty(configFactory, key, {
            configurable: false,
            enumerable: false,
            value,
            writable: false,
        });
    };
    defineProperty(config_constants_1.PARTIAL_CONFIGURATION_KEY, token);
    defineProperty(config_constants_1.PARTIAL_CONFIGURATION_PROPNAME, (0, get_config_token_util_1.getConfigToken)(token));
    defineProperty(config_constants_1.AS_PROVIDER_METHOD_KEY, () => ({
        imports: [__1.ConfigModule.forFeature(configFactory)],
        useFactory: (config) => config,
        inject: [(0, get_config_token_util_1.getConfigToken)(token)],
    }));
    return configFactory;
}
exports.registerAs = registerAs;


/***/ }),

/***/ "../../libs/data/node_modules/@nestjs/config/index.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(__webpack_require__("../../libs/data/node_modules/@nestjs/config/dist/index.js"));


/***/ }),

/***/ "./src/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("./node_modules/@nestjs/config/index.js");
const event_emitter_1 = __webpack_require__("@nestjs/event-emitter");
const controllers_module_1 = __webpack_require__("./src/controllers/controllers.module.ts");
const logger_middleware_1 = __webpack_require__("./src/core/logging/logger.middleware.ts");
const data_1 = __webpack_require__("../../libs/data/src/index.ts");
const services_module_1 = __webpack_require__("./src/services/services.module.ts");
const socket_module_1 = __webpack_require__("./src/socket/socket.module.ts");
const serve_static_1 = __webpack_require__("@nestjs/serve-static");
const path = __webpack_require__("path");
const serveStatic = process.env.NX_SERVE_STATIC === 'true';
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware)
            .forRoutes('*');
    }
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: serveStatic ? path.resolve(process.env.NX_SERVE_STATIC_PATH || 'client') : null,
            }),
            data_1.DatabaseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('NX_DATABASE_HOST'),
                    port: +configService.get('NX_DATABASE_PORT'),
                    username: configService.get('NX_DATABASE_USERNAME'),
                    password: configService.get('NX_DATABASE_PASSWORD'),
                    database: configService.get('NX_DATABASE_NAME'),
                    logging: configService.get('NX_DATABASE_ENABLE_LOGGING') === 'true',
                }),
                inject: [config_1.ConfigService]
            }),
            services_module_1.ServicesModule,
            socket_module_1.SocketModule,
            controllers_module_1.ControllersModule,
            event_emitter_1.EventEmitterModule.forRoot()
        ]
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/constants/index.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: 'secretKey',
    expiresIn: '24h'
};


/***/ }),

/***/ "./src/controllers/channels.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChannelsController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const shared_1 = __webpack_require__("../../libs/shared/src/index.ts");
const jwt_guard_1 = __webpack_require__("./src/services/guard/jwt.guard.ts");
const channels_service_1 = __webpack_require__("./src/services/channels.service.ts");
let ChannelsController = class ChannelsController {
    constructor(channelsService) {
        this.channelsService = channelsService;
    }
    findAll(filter) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.channelsService.findAll(filter);
        });
    }
    findOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.channelsService.getById(id);
        });
    }
    getStreamPlayback(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.channelsService.getStreamPlayback(id);
        });
    }
    createChannel(body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.channelsService.createChannel(body.name);
        });
    }
    updateChannel(dto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.channelsService.updateChannel(dto);
        });
    }
    deleteChannel(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.channelsService.deleteChannel(id);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof shared_1.ChannelFilter !== "undefined" && shared_1.ChannelFilter) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ChannelsController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ChannelsController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id/live_stream'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ChannelsController.prototype, "getStreamPlayback", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ChannelsController.prototype, "createChannel", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof shared_1.ChannelDto !== "undefined" && shared_1.ChannelDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ChannelsController.prototype, "updateChannel", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ChannelsController.prototype, "deleteChannel", null);
ChannelsController = tslib_1.__decorate([
    (0, common_1.Controller)('channels'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof channels_service_1.ChannelsService !== "undefined" && channels_service_1.ChannelsService) === "function" ? _j : Object])
], ChannelsController);
exports.ChannelsController = ChannelsController;


/***/ }),

/***/ "./src/controllers/controllers.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ControllersModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const terminus_1 = __webpack_require__("@nestjs/terminus");
const users_controller_1 = __webpack_require__("./src/controllers/users.controller.ts");
const health_controller_1 = __webpack_require__("./src/controllers/health.controller.ts");
const channels_controller_1 = __webpack_require__("./src/controllers/channels.controller.ts");
const widgets_controller_1 = __webpack_require__("./src/controllers/widgets.controller.ts");
const services_module_1 = __webpack_require__("./src/services/services.module.ts");
let ControllersModule = class ControllersModule {
};
ControllersModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            terminus_1.TerminusModule,
            services_module_1.ServicesModule,
        ],
        controllers: [
            users_controller_1.UsersController,
            channels_controller_1.ChannelsController,
            widgets_controller_1.WidgetsController,
            health_controller_1.HealthController
        ],
    })
], ControllersModule);
exports.ControllersModule = ControllersModule;


/***/ }),

/***/ "./src/controllers/health.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const terminus_1 = __webpack_require__("@nestjs/terminus");
const typeorm_1 = __webpack_require__("typeorm");
let HealthController = class HealthController {
    constructor(connection, healthCheckService, typeOrmHealthIndicator) {
        this.connection = connection;
        this.healthCheckService = healthCheckService;
        this.typeOrmHealthIndicator = typeOrmHealthIndicator;
    }
    check() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.healthCheckService.check([
                () => tslib_1.__awaiter(this, void 0, void 0, function* () { return this.typeOrmHealthIndicator.pingCheck('database', { timeout: 1500, connection: this.connection }); })
            ]);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, terminus_1.HealthCheck)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], HealthController.prototype, "check", null);
HealthController = tslib_1.__decorate([
    (0, common_1.Controller)('health'),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof typeorm_1.Connection !== "undefined" && typeorm_1.Connection) === "function" ? _b : Object, typeof (_c = typeof terminus_1.HealthCheckService !== "undefined" && terminus_1.HealthCheckService) === "function" ? _c : Object, typeof (_d = typeof terminus_1.TypeOrmHealthIndicator !== "undefined" && terminus_1.TypeOrmHealthIndicator) === "function" ? _d : Object])
], HealthController);
exports.HealthController = HealthController;


/***/ }),

/***/ "./src/controllers/users.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const express_1 = __webpack_require__("express");
const passport_1 = __webpack_require__("@nestjs/passport");
const shared_1 = __webpack_require__("../../libs/shared/src/index.ts");
const users_service_1 = __webpack_require__("./src/services/users.service.ts");
const auth_service_1 = __webpack_require__("./src/services/auth.service.ts");
let UsersController = class UsersController {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    findAll(filter) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.usersService.findAll(filter);
        });
    }
    // @Put()
    // public async create(@Body() entity: UserDto): Promise<UserDto> {
    //   return this.usersService.upsert(entity);
    // }
    login(res, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const accessToken = this.authService.generateJWT(user);
            return JSON.stringify(accessToken);
        });
    }
    registration(newUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newUser = yield this.authService.registrateUser(newUserDto);
            const accessToken = this.authService.generateJWT(newUser);
            return JSON.stringify(accessToken);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof shared_1.UserFilter !== "undefined" && shared_1.UserFilter) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UsersController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local')),
    (0, common_1.Post)('/login'),
    tslib_1.__param(0, (0, common_1.Res)({ passthrough: true })),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object, typeof (_d = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UsersController.prototype, "login", null);
tslib_1.__decorate([
    (0, common_1.Post)('/signup'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof shared_1.UserCreationDto !== "undefined" && shared_1.UserCreationDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "registration", null);
UsersController = tslib_1.__decorate([
    (0, common_1.Controller)('users'),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _g : Object, typeof (_h = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _h : Object])
], UsersController);
exports.UsersController = UsersController;


/***/ }),

/***/ "./src/controllers/widgets.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WidgetsController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const shared_1 = __webpack_require__("../../libs/shared/src/index.ts");
const jwt_guard_1 = __webpack_require__("./src/services/guard/jwt.guard.ts");
const widgets_service_1 = __webpack_require__("./src/services/widgets.service.ts");
let WidgetsController = class WidgetsController {
    constructor(widgetsService) {
        this.widgetsService = widgetsService;
    }
    findAll(widgetId, filter) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.widgetsService.findAll(widgetId, filter);
        });
    }
    createWidget(body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.widgetsService.createWidget(body);
        });
    }
    updateWidget(dto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.widgetsService.updateWidget(dto);
        });
    }
    deleteWidget(body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { channelId, widgetId } = body;
            yield this.widgetsService.deleteWidget({ channelId, widgetId });
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_a = typeof shared_1.WidgetFilter !== "undefined" && shared_1.WidgetFilter) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], WidgetsController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof shared_1.WidgetDto !== "undefined" && shared_1.WidgetDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], WidgetsController.prototype, "createWidget", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof shared_1.WidgetDto !== "undefined" && shared_1.WidgetDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], WidgetsController.prototype, "updateWidget", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], WidgetsController.prototype, "deleteWidget", null);
WidgetsController = tslib_1.__decorate([
    (0, common_1.Controller)('widgets'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof widgets_service_1.WidgetsService !== "undefined" && widgets_service_1.WidgetsService) === "function" ? _h : Object])
], WidgetsController);
exports.WidgetsController = WidgetsController;


/***/ }),

/***/ "./src/core/logging/logger.middleware.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerMiddleware = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("./node_modules/@nestjs/config/index.js");
let LoggerMiddleware = class LoggerMiddleware {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger('HTTP');
        this.isResponseBodyLoggingEnabled = this.configService.get('NX_ENABLE_RESPONSE_BODY_LOGGING') === 'true';
        this.isVerboseRequestsLoggingEnabled = this.configService.get('NX_ENABLE_VERBOSE_REQUESTS_LOGGING') === 'true';
    }
    use(request, response, next) {
        const { ip, method, body, query } = request;
        const userAgent = request.get('user-agent') || '';
        if (this.isResponseBodyLoggingEnabled) {
            const oldJsonFunc = response.json;
            response.json = (body) => {
                response.locals._jsonBody = body;
                return oldJsonFunc.call(response, body);
            };
        }
        response.on('close', () => {
            var _a, _b;
            const { statusCode, locals } = response;
            const contentLength = response.get('content-length');
            const url = request.url;
            const path = (_a = request.route) === null || _a === void 0 ? void 0 : _a.path;
            if (!url.includes('/users')) {
                if (this.isVerboseRequestsLoggingEnabled) {
                    this.logger.log({
                        method,
                        url,
                        path,
                        statusCode,
                        body,
                        ip,
                        query,
                        contentLength: contentLength || 0,
                        userAgent,
                        currentUserId: (_b = request.user) === null || _b === void 0 ? void 0 : _b.id,
                        responseJsonBody: locals._jsonBody
                    });
                }
                else {
                    this.logger.log(`[${ip}] [${method}] ${url} - ${statusCode}`);
                }
            }
        });
        next();
    }
};
LoggerMiddleware = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;


/***/ }),

/***/ "./src/exceptions-filters/all-exceptions.filter.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const base_app_exceptions_filter_1 = __webpack_require__("./src/exceptions-filters/base-app-exceptions.filter.ts");
let AllExceptionsFilter = class AllExceptionsFilter extends base_app_exceptions_filter_1.default {
    constructor() {
        super(...arguments);
        this.defaultStatusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
    }
};
AllExceptionsFilter = tslib_1.__decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
exports["default"] = AllExceptionsFilter;


/***/ }),

/***/ "./src/exceptions-filters/bad-request-exceptions.filter.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const base_app_exceptions_filter_1 = __webpack_require__("./src/exceptions-filters/base-app-exceptions.filter.ts");
const bad_request_detailed_exception_1 = __webpack_require__("./src/exceptions/bad-request-detailed.exception.ts");
let BadRequestExceptionsFilter = class BadRequestExceptionsFilter extends base_app_exceptions_filter_1.default {
    constructor() {
        super(...arguments);
        this.defaultStatusCode = common_1.HttpStatus.BAD_REQUEST;
    }
    getFieldsErrors(exception) {
        if (exception instanceof bad_request_detailed_exception_1.default)
            return exception.fieldsErrors;
        else
            return undefined;
    }
};
BadRequestExceptionsFilter = tslib_1.__decorate([
    (0, common_1.Catch)(bad_request_detailed_exception_1.default)
], BadRequestExceptionsFilter);
exports["default"] = BadRequestExceptionsFilter;


/***/ }),

/***/ "./src/exceptions-filters/base-app-exceptions.filter.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__("@nestjs/common");
class BaseAppExceptionsFilter {
    constructor() {
        this.defaultErrorMessage = 'Something went wrong';
        this.defaultStatusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const statusCode = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : this.defaultStatusCode;
        let message;
        let description;
        let exceptionDetails;
        if (exception instanceof common_1.HttpException) {
            const errorResponse = exception.getResponse();
            const messageFromResponse = errorResponse['message'];
            description = errorResponse['error'];
            if (messageFromResponse)
                message = messageFromResponse;
            else
                exceptionDetails = errorResponse;
        }
        else {
            message = typeof exception === 'string' ? exception : exception.message;
            BaseAppExceptionsFilter.logger.error(exception);
        }
        const responseBody = {
            statusCode,
            timestamp: new Date().toISOString(),
            message: message || this.defaultErrorMessage,
            description,
            exceptionDetails,
            path: request.url,
            fieldsErrors: this.getFieldsErrors ? this.getFieldsErrors(exception) : undefined
        };
        response.status(statusCode).json(responseBody);
    }
}
exports["default"] = BaseAppExceptionsFilter;
BaseAppExceptionsFilter.logger = new common_1.Logger('ExceptionsHandler');


/***/ }),

/***/ "./src/exceptions/bad-request-detailed.exception.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__("@nestjs/common");
class BadRequestDetailedException extends common_1.BadRequestException {
    constructor(message, fieldsErrors) {
        super(message);
        this.fieldsErrors = fieldsErrors;
    }
}
exports["default"] = BadRequestDetailedException;


/***/ }),

/***/ "./src/services/auth.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const bcryptjs_1 = __webpack_require__("bcryptjs");
const _ = __webpack_require__("lodash");
const users_service_1 = __webpack_require__("./src/services/users.service.ts");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    validateUser(email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const foundUser = yield this.usersService.findByEmail(email);
            if (foundUser === null || foundUser === void 0 ? void 0 : foundUser.password) {
                const isEqual = yield (0, bcryptjs_1.compare)(password, foundUser.password);
                if (isEqual) {
                    return { user: _.omit(foundUser, 'password') };
                }
                return { error: true, message: 'Incorrect password' };
            }
            return { error: true, message: 'This user does not exist' };
        });
    }
    generateJWT(user) {
        return this.jwtService.sign(user);
    }
    registrateUser(newUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const saltOfRounds = 10;
            const hashPassword = yield (0, bcryptjs_1.hash)(newUserDto.password, saltOfRounds);
            const newUser = yield this.usersService.createUser(Object.assign(Object.assign({}, newUserDto), { password: hashPassword }));
            return _.omit(newUser, 'password');
        });
    }
};
AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./src/services/channels.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChannelsService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const client_ivs_service_1 = __webpack_require__("./src/services/client-ivs.service.ts");
const data_1 = __webpack_require__("../../libs/data/src/index.ts");
let ChannelsService = class ChannelsService {
    constructor(channelsRepository, clientIvsService) {
        this.channelsRepository = channelsRepository;
        this.clientIvsService = clientIvsService;
    }
    findAll(filter) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.channelsRepository
                .createQueryBuilder('channels')
                .orderBy('channels.createdAt', 'DESC')
                .getManyWithTotals(filter);
        });
    }
    getById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const foundChannel = yield this.channelsRepository.findOneBy({ id });
            if (!foundChannel) {
                throw new common_1.NotFoundException('Channel not found');
            }
            ;
            return foundChannel;
        });
    }
    getStreamPlayback(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const foundChannel = yield this.getById(id);
            return yield this.clientIvsService.getStreamPlayback(foundChannel.ARN);
        });
    }
    createChannel(name) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newChannelData = yield this.clientIvsService.createChannel(name);
            const newChannel = this.channelsRepository.create(newChannelData);
            return yield this.channelsRepository.save(newChannel);
        });
    }
    updateChannel(body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id, name } = body;
            const foundChannel = yield this.getById(id);
            yield this.clientIvsService.updateChannel(name, foundChannel.ARN);
            yield this.channelsRepository.update(id, { name });
        });
    }
    deleteChannel(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const foundChannel = yield this.getById(id);
            yield this.clientIvsService.deleteChannel(foundChannel.ARN);
            yield this.channelsRepository.delete(id);
        });
    }
};
ChannelsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(data_1.Channel)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof client_ivs_service_1.ClientIvsService !== "undefined" && client_ivs_service_1.ClientIvsService) === "function" ? _b : Object])
], ChannelsService);
exports.ChannelsService = ChannelsService;


/***/ }),

/***/ "./src/services/client-ivs.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var ClientIvsService_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientIvsService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("./node_modules/@nestjs/config/index.js");
const client_ivs_1 = __webpack_require__("@aws-sdk/client-ivs");
const events_service_1 = __webpack_require__("./src/services/events.service.ts");
let ClientIvsService = ClientIvsService_1 = class ClientIvsService {
    constructor(configService, eventsService) {
        this.configService = configService;
        this.eventsService = eventsService;
        this.ivsClient = new client_ivs_1.IvsClient({
            region: this.configService.get('NX_AMAZON_IVS_REGION'),
            credentials: {
                accessKeyId: this.configService.get('NX_AMAZON_IVS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get('NX_AMAZON_IVS_SECRET_ACCESS_KEY')
            }
        });
    }
    getStreamPlayback(channelArn) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const streamCommandInput = { channelArn };
            const streamCommand = new client_ivs_1.GetStreamCommand(streamCommandInput);
            try {
                const streamData = yield this.ivsClient.send(streamCommand);
                this.eventsService.emitStream((_a = streamData === null || streamData === void 0 ? void 0 : streamData.stream) === null || _a === void 0 ? void 0 : _a.playbackUrl);
                return streamData === null || streamData === void 0 ? void 0 : streamData.stream;
            }
            catch (error) {
                this.eventsService.emitStream(null);
                this.handleError(error);
            }
        });
    }
    createChannel(name) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const channelCommandInput = {
                name,
                authorized: false,
                latencyMode: client_ivs_1.ChannelLatencyMode.LowLatency,
                type: client_ivs_1.ChannelType.StandardChannelType
            };
            const channelCommand = new client_ivs_1.CreateChannelCommand(channelCommandInput);
            try {
                const channelData = yield this.ivsClient.send(channelCommand);
                const { channel, streamKey } = channelData;
                const streamData = {
                    name: channel.name,
                    key: streamKey.value,
                    ingestEndpoint: this.getIngestEndpoint(channel.ingestEndpoint),
                    playbackURL: channel.playbackUrl,
                    ARN: channel.arn
                };
                return streamData;
            }
            catch (error) {
                this.handleError(error);
            }
        });
    }
    updateChannel(name, arn) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const channelCommandInput = { name, arn };
            const channelCommand = new client_ivs_1.UpdateChannelCommand(channelCommandInput);
            try {
                yield this.ivsClient.send(channelCommand);
            }
            catch (error) {
                this.handleError(error);
            }
        });
    }
    deleteChannel(arn) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const channelCommandInput = { arn };
            const channelCommand = new client_ivs_1.DeleteChannelCommand(channelCommandInput);
            try {
                yield this.ivsClient.send(channelCommand);
            }
            catch (error) {
                this.handleError(error);
            }
        });
    }
    getIngestEndpoint(endpoint) {
        return `rtmps://${endpoint}:443/app/`;
    }
    handleError(error) {
        const errorMessage = typeof error === 'string'
            ? error
            : error === null || error === void 0 ? void 0 : error.message;
        ClientIvsService_1.logger.error(errorMessage, 'ClientIvsService');
        throw error;
    }
};
ClientIvsService.logger = new common_1.Logger('ClientIvsService');
ClientIvsService = ClientIvsService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof events_service_1.EventsService !== "undefined" && events_service_1.EventsService) === "function" ? _b : Object])
], ClientIvsService);
exports.ClientIvsService = ClientIvsService;


/***/ }),

/***/ "./src/services/events.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventsService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const event_emitter_1 = __webpack_require__("@nestjs/event-emitter");
const shared_1 = __webpack_require__("../../libs/shared/src/index.ts");
let EventsService = class EventsService {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    ;
    emitStream(playbackUrl) {
        this.eventEmitter.emit(shared_1.WidgetsSocketEventsEnum.StreamReceived, shared_1.IonicRequisitesEnum.Id, playbackUrl);
    }
    emitWidgets(widgets) {
        this.eventEmitter.emit(shared_1.WidgetsSocketEventsEnum.WidgetsReceived, shared_1.IonicRequisitesEnum.Id, widgets);
    }
    emitVisibleWidgets(widgets) {
        this.eventEmitter.emit(shared_1.WidgetsSocketEventsEnum.WidgetsShown, shared_1.IonicRequisitesEnum.Id, widgets);
    }
    emitPurchasedWidget(id, widget) {
        this.eventEmitter.emit(shared_1.WidgetsSocketEventsEnum.WidgetPurchased, id, widget);
    }
};
EventsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof event_emitter_1.EventEmitter2 !== "undefined" && event_emitter_1.EventEmitter2) === "function" ? _a : Object])
], EventsService);
exports.EventsService = EventsService;


/***/ }),

/***/ "./src/services/events/widgets-socket.events.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WidgetsSocketEventsService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const event_emitter_1 = __webpack_require__("@nestjs/event-emitter");
const socket_gateway_1 = __webpack_require__("./src/socket/socket.gateway.ts");
const shared_1 = __webpack_require__("../../libs/shared/src/index.ts");
let WidgetsSocketEventsService = class WidgetsSocketEventsService {
    constructor(socketGateway) {
        this.socketGateway = socketGateway;
    }
    onNewWidgetsReceived(id, widgets) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.socketGateway.emitWidgets(id, widgets);
        });
    }
    onNewStreamReceived(id, playbackUrl) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.socketGateway.emitPlaybackUrl(id, playbackUrl);
        });
    }
    onVisibleWidgetReceived(id, widgets) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.socketGateway.emitVisibleWidgets(id, widgets);
        });
    }
    onWidgetPurchased(id, widget) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.socketGateway.emitPurchasedWidget(id, widget);
        });
    }
};
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)(shared_1.WidgetsSocketEventsEnum.WidgetsReceived),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array]),
    tslib_1.__metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], WidgetsSocketEventsService.prototype, "onNewWidgetsReceived", null);
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)(shared_1.WidgetsSocketEventsEnum.StreamReceived),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], WidgetsSocketEventsService.prototype, "onNewStreamReceived", null);
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)(shared_1.WidgetsSocketEventsEnum.WidgetsShown),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], WidgetsSocketEventsService.prototype, "onVisibleWidgetReceived", null);
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)(shared_1.WidgetsSocketEventsEnum.WidgetPurchased),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_d = typeof shared_1.WidgetDto !== "undefined" && shared_1.WidgetDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], WidgetsSocketEventsService.prototype, "onWidgetPurchased", null);
WidgetsSocketEventsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof socket_gateway_1.SocketGateway !== "undefined" && socket_gateway_1.SocketGateway) === "function" ? _f : Object])
], WidgetsSocketEventsService);
exports.WidgetsSocketEventsService = WidgetsSocketEventsService;


/***/ }),

/***/ "./src/services/extensions/filters/base-filters-extensions.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getOffsetOptionFromFilter = exports.getLimitOptionFromFilter = exports.getOrderOptionsFromFilter = void 0;
function getOrderOptionsFromFilter(filter) {
    var _a;
    return (_a = filter.orderedBy) === null || _a === void 0 ? void 0 : _a.reduce((acc, v) => (Object.assign(Object.assign({}, acc), { [v.field]: v.isReversed ? 'DESC' : 'ASC' })), {});
}
exports.getOrderOptionsFromFilter = getOrderOptionsFromFilter;
function getLimitOptionFromFilter(filter, defaultSize = 10) {
    return filter.pageSize || defaultSize || null;
}
exports.getLimitOptionFromFilter = getLimitOptionFromFilter;
function getOffsetOptionFromFilter(filter) {
    if (filter.page)
        return getLimitOptionFromFilter(filter) * (filter.page - 1);
    else
        return null;
}
exports.getOffsetOptionFromFilter = getOffsetOptionFromFilter;


/***/ }),

/***/ "./src/services/guard/jwt.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
JwtAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),

/***/ "./src/services/services.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServicesModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const data_1 = __webpack_require__("../../libs/data/src/index.ts");
const passport_1 = __webpack_require__("@nestjs/passport");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const users_service_1 = __webpack_require__("./src/services/users.service.ts");
const channels_service_1 = __webpack_require__("./src/services/channels.service.ts");
const auth_service_1 = __webpack_require__("./src/services/auth.service.ts");
const widgets_service_1 = __webpack_require__("./src/services/widgets.service.ts");
const events_service_1 = __webpack_require__("./src/services/events.service.ts");
const widgets_socket_events_1 = __webpack_require__("./src/services/events/widgets-socket.events.ts");
const client_ivs_service_1 = __webpack_require__("./src/services/client-ivs.service.ts");
const jwt_strategy_1 = __webpack_require__("./src/services/strategy/jwt.strategy.ts");
const jwt_guard_1 = __webpack_require__("./src/services/guard/jwt.guard.ts");
const local_strategy_1 = __webpack_require__("./src/services/strategy/local.strategy.ts");
const constants_1 = __webpack_require__("./src/constants/index.ts");
const config_1 = __webpack_require__("./node_modules/@nestjs/config/index.js");
const socket_module_1 = __webpack_require__("./src/socket/socket.module.ts");
const socket_gateway_1 = __webpack_require__("./src/socket/socket.gateway.ts");
let ServicesModule = class ServicesModule {
};
ServicesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            data_1.DatabaseModule.forFeature([data_1.User, data_1.Channel, data_1.Widget]),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: {
                    expiresIn: constants_1.jwtConstants.expiresIn
                }
            })
        ],
        providers: [
            config_1.ConfigService,
            users_service_1.UsersService,
            auth_service_1.AuthService,
            widgets_service_1.WidgetsService,
            widgets_socket_events_1.WidgetsSocketEventsService,
            events_service_1.EventsService,
            channels_service_1.ChannelsService,
            client_ivs_service_1.ClientIvsService,
            jwt_guard_1.JwtAuthGuard,
            jwt_strategy_1.JwtStrategy,
            local_strategy_1.LocalStrategy,
            socket_module_1.SocketModule,
            socket_gateway_1.SocketGateway
        ],
        exports: [
            users_service_1.UsersService,
            auth_service_1.AuthService,
            channels_service_1.ChannelsService,
            widgets_service_1.WidgetsService,
            widgets_socket_events_1.WidgetsSocketEventsService,
            events_service_1.EventsService,
            client_ivs_service_1.ClientIvsService
        ]
    })
], ServicesModule);
exports.ServicesModule = ServicesModule;


/***/ }),

/***/ "./src/services/strategy/jwt.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const passport_1 = __webpack_require__("@nestjs/passport");
const common_1 = __webpack_require__("@nestjs/common");
const constants_1 = __webpack_require__("./src/constants/index.ts");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: constants_1.jwtConstants.secret,
        });
    }
    validate(payload) {
        return payload;
    }
};
JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),

/***/ "./src/services/strategy/local.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const passport_local_1 = __webpack_require__("passport-local");
const passport_1 = __webpack_require__("@nestjs/passport");
const common_1 = __webpack_require__("@nestjs/common");
const auth_service_1 = __webpack_require__("./src/services/auth.service.ts");
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super({
            usernameField: 'email'
        });
        this.authService = authService;
    }
    validate(email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { user, error, message } = yield this.authService.validateUser(email, password);
            if (!user && error)
                throw new common_1.UnauthorizedException(message);
            return user;
        });
    }
};
LocalStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;


/***/ }),

/***/ "./src/services/users.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const data_1 = __webpack_require__("../../libs/data/src/index.ts");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const base_filters_extensions_1 = __webpack_require__("./src/services/extensions/filters/base-filters-extensions.ts");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    findAll(filter) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.usersRepository.find({
                order: (0, base_filters_extensions_1.getOrderOptionsFromFilter)(filter),
                take: (0, base_filters_extensions_1.getLimitOptionFromFilter)(filter),
                skip: (0, base_filters_extensions_1.getOffsetOptionFromFilter)(filter)
            });
        });
    }
    findByEmail(email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.usersRepository.findOne({ where: { email } });
        });
    }
    createUser(dto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = this.usersRepository.create(dto);
            return yield this.usersRepository.save(user);
        });
    }
};
UsersService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(data_1.User)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], UsersService);
exports.UsersService = UsersService;


/***/ }),

/***/ "./src/services/widgets.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WidgetsService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const events_service_1 = __webpack_require__("./src/services/events.service.ts");
const data_1 = __webpack_require__("../../libs/data/src/index.ts");
let WidgetsService = class WidgetsService {
    constructor(widgetsRepository, eventsService) {
        this.widgetsRepository = widgetsRepository;
        this.eventsService = eventsService;
    }
    findAll(channelId, filter) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.widgetsRepository
                .createQueryBuilder('widgets')
                .where({ channelId })
                .orderBy('widgets.createdAt', 'DESC')
                .getManyWithTotals(filter);
        });
    }
    getById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const foundWidget = yield this.widgetsRepository.findOneBy({ id });
            if (!foundWidget) {
                throw new common_1.NotFoundException('Channel not found');
            }
            ;
            return foundWidget;
        });
    }
    createWidget(body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newWidget = this.widgetsRepository.create(body);
            return yield this.widgetsRepository.save(newWidget);
        });
    }
    showVisibleWidgets(body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const widgets = [];
            for (const id of body) {
                const widget = yield this.getById(id);
                widgets.push(widget);
            }
            return widgets;
        });
    }
    updateWidget(body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id } = body, bodyWithoutId = tslib_1.__rest(body, ["id"]);
            yield this.widgetsRepository.update(id, bodyWithoutId);
        });
    }
    deleteWidget({ channelId, widgetId }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const foundWidget = yield this.widgetsRepository.findOne({
                where: {
                    id: widgetId,
                    channelId
                }
            });
            if (!foundWidget) {
                throw new common_1.NotFoundException('Widget not found');
            }
            ;
            yield this.widgetsRepository.delete(widgetId);
        });
    }
};
WidgetsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(data_1.Widget)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof events_service_1.EventsService !== "undefined" && events_service_1.EventsService) === "function" ? _b : Object])
], WidgetsService);
exports.WidgetsService = WidgetsService;


/***/ }),

/***/ "./src/socket/socket.gateway.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var SocketGateway_1, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SocketGateway = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const socket_io_1 = __webpack_require__("socket.io");
const websockets_1 = __webpack_require__("@nestjs/websockets");
const shared_1 = __webpack_require__("../../libs/shared/src/index.ts");
const events_service_1 = __webpack_require__("./src/services/events.service.ts");
const widgets_service_1 = __webpack_require__("./src/services/widgets.service.ts");
let SocketGateway = SocketGateway_1 = class SocketGateway {
    constructor(eventsService, widgetsService) {
        this.eventsService = eventsService;
        this.widgetsService = widgetsService;
        this.userRoomPrefix = 'user-';
        this.playerRoomPrefix = 'player-';
        this.widgetsRoomPrefix = 'widgets-';
        this.visibleWidgetsRoomPrefix = 'visible-widgets-';
        this.purchasedWidgetsRoomPrefix = 'purchased-widgets-';
        // generate room methods
        this.generateUserRoom = (id) => `${this.userRoomPrefix}_${id}`;
        this.generatePlayerRoom = (id) => `${this.playerRoomPrefix}_${id}`;
        this.generateWidgetsRoom = (id) => `${this.widgetsRoomPrefix}_${id}`;
        this.generateVisibleWidgetsRoom = (id) => `${this.visibleWidgetsRoomPrefix}_${id}`;
        this.generatePurchasedWidgetsRoom = (id) => `${this.purchasedWidgetsRoomPrefix}_${id}`;
    }
    // Player 
    onClientJoinAmazonIVSPlayer(id, client) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const playerRoom = this.generatePlayerRoom(id);
            client.join(playerRoom);
            SocketGateway_1.logger.log(`User ${id} is joined to room ${playerRoom}`);
        });
    }
    onClientLeftAmazonIVSPlayer(id, client) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const playerRoom = this.generatePlayerRoom(id);
            client.leave(playerRoom);
            SocketGateway_1.logger.warn(`User ${id} is leaved room ${playerRoom}`);
        });
    }
    // Widgets
    onClientJoinWidgets(id, client) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const widgetsRoom = this.generateWidgetsRoom(id);
            client.join(widgetsRoom);
            SocketGateway_1.logger.log(`User ${id} is joined to room ${widgetsRoom}`);
        });
    }
    onClientLeftWidgets(id, client) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const widgetsRoom = this.generateWidgetsRoom(id);
            client.leave(widgetsRoom);
            SocketGateway_1.logger.warn(`User ${id} is leaved room ${widgetsRoom}`);
        });
    }
    onReceiveWidgets(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.eventsService.emitWidgets(data || []);
        });
    }
    // Show visible widgets 
    onClientJoinVisibleWidgets(id, client) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const visibleWidgetsRoom = this.generateVisibleWidgetsRoom(id);
            client.join(visibleWidgetsRoom);
            SocketGateway_1.logger.log(`User ${id} is joined to room ${visibleWidgetsRoom}`);
        });
    }
    onClientLeftVisibleWidgets(id, client) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const visibleWidgetsRoom = this.generateVisibleWidgetsRoom(id);
            client.leave(visibleWidgetsRoom);
            SocketGateway_1.logger.warn(`User ${id} is leaved room ${visibleWidgetsRoom}`);
        });
    }
    onReceiveVisibleWidgets(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const widgets = yield this.widgetsService.showVisibleWidgets(data);
            this.eventsService.emitVisibleWidgets(widgets);
        });
    }
    // Buying widgets
    onClientJoinPurchasedWidgets(id, client) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const purchasedWidgetsRoom = this.generatePurchasedWidgetsRoom(id);
            client.join(purchasedWidgetsRoom);
            SocketGateway_1.logger.log(`User ${id} is joined to room ${purchasedWidgetsRoom}`);
        });
    }
    onClientLeftPurchasedWidgets(id, client) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const purchasedWidgetsRoom = this.generatePurchasedWidgetsRoom(id);
            client.leave(purchasedWidgetsRoom);
            SocketGateway_1.logger.warn(`User ${id} is leaved room ${purchasedWidgetsRoom}`);
        });
    }
    onReceivePurchasedWidgets(data, client) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.eventsService.emitPurchasedWidget(client.data.user, data);
        });
    }
    emitPurchasedWidget(id, widget) {
        const purchasedWidgetsRoom = this.generatePurchasedWidgetsRoom(id);
        this.server.to(purchasedWidgetsRoom).emit(`${shared_1.SocketEnum.PurchasedWidget}_${id}`, widget);
    }
    emitVisibleWidgets(id, widgets) {
        const visibleWidgetsRoom = this.generateVisibleWidgetsRoom(id);
        this.server.to(visibleWidgetsRoom).emit(`${shared_1.SocketEnum.ReceivedVisibleWidgets}_${id}`, widgets);
    }
    emitPlaybackUrl(id, playbackUrl) {
        const playerRoom = this.generatePlayerRoom(id);
        this.server.to(playerRoom).emit(`${shared_1.SocketEnum.ReceivedPlaybackUrl}_${id}`, playbackUrl);
    }
    emitWidgets(id, widgets) {
        const widgetsRoom = this.generateWidgetsRoom(id);
        this.server.to(widgetsRoom).emit(`${shared_1.SocketEnum.ReceivedWidgets}_${id}`, widgets);
    }
    // Connection handling
    handleConnection(client) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const user = ((_a = client.handshake.query) === null || _a === void 0 ? void 0 : _a.id)
                    ? client.handshake.query.id
                    : client.handshake.query.id;
                client.data.user = user;
                const ionicRoom = this.generateUserRoom(user);
                client.join(ionicRoom);
                SocketGateway_1.logger.log(`User ${user} is connected`);
            }
            catch (error) {
                SocketGateway_1.logger.error(error === null || error === void 0 ? void 0 : error.message, `User disconnected`);
                client.disconnect();
            }
        });
    }
    afterInit() {
        SocketGateway_1.logger.log(`User inited`);
    }
    handleDisconnect() {
        SocketGateway_1.logger.warn(`User disconnected`);
    }
};
SocketGateway.logger = new common_1.Logger('SocketGateway');
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], SocketGateway.prototype, "server", void 0);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)(shared_1.SocketEnum.JoinPlayer),
    tslib_1.__param(0, (0, websockets_1.MessageBody)('id')),
    tslib_1.__param(1, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], SocketGateway.prototype, "onClientJoinAmazonIVSPlayer", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)(shared_1.SocketEnum.LeftPlayer),
    tslib_1.__param(0, (0, websockets_1.MessageBody)('id')),
    tslib_1.__param(1, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_d = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], SocketGateway.prototype, "onClientLeftAmazonIVSPlayer", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)(shared_1.SocketEnum.JoinWidgets),
    tslib_1.__param(0, (0, websockets_1.MessageBody)('id')),
    tslib_1.__param(1, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_f = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], SocketGateway.prototype, "onClientJoinWidgets", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)(shared_1.SocketEnum.LeftWidgets),
    tslib_1.__param(0, (0, websockets_1.MessageBody)('id')),
    tslib_1.__param(1, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_h = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], SocketGateway.prototype, "onClientLeftWidgets", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)(shared_1.SocketEnum.ReceivedWidgets),
    tslib_1.__param(0, (0, websockets_1.MessageBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], SocketGateway.prototype, "onReceiveWidgets", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)(shared_1.SocketEnum.JoinVisibleWidgets),
    tslib_1.__param(0, (0, websockets_1.MessageBody)('id')),
    tslib_1.__param(1, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_l = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _l : Object]),
    tslib_1.__metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], SocketGateway.prototype, "onClientJoinVisibleWidgets", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)(shared_1.SocketEnum.LeftVisibleWidgets),
    tslib_1.__param(0, (0, websockets_1.MessageBody)('id')),
    tslib_1.__param(1, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_o = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _o : Object]),
    tslib_1.__metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], SocketGateway.prototype, "onClientLeftVisibleWidgets", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)(shared_1.SocketEnum.ReceivedVisibleWidgets),
    tslib_1.__param(0, (0, websockets_1.MessageBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], SocketGateway.prototype, "onReceiveVisibleWidgets", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)(shared_1.SocketEnum.JoinPurchasedWidgets),
    tslib_1.__param(0, (0, websockets_1.MessageBody)('id')),
    tslib_1.__param(1, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_r = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _r : Object]),
    tslib_1.__metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], SocketGateway.prototype, "onClientJoinPurchasedWidgets", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)(shared_1.SocketEnum.LeftPurchasedWidgets),
    tslib_1.__param(0, (0, websockets_1.MessageBody)('id')),
    tslib_1.__param(1, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_t = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _t : Object]),
    tslib_1.__metadata("design:returntype", typeof (_u = typeof Promise !== "undefined" && Promise) === "function" ? _u : Object)
], SocketGateway.prototype, "onClientLeftPurchasedWidgets", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)(shared_1.SocketEnum.PurchasedWidget),
    tslib_1.__param(0, (0, websockets_1.MessageBody)()),
    tslib_1.__param(1, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_v = typeof shared_1.WidgetDto !== "undefined" && shared_1.WidgetDto) === "function" ? _v : Object, typeof (_w = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _w : Object]),
    tslib_1.__metadata("design:returntype", typeof (_x = typeof Promise !== "undefined" && Promise) === "function" ? _x : Object)
], SocketGateway.prototype, "onReceivePurchasedWidgets", null);
tslib_1.__decorate([
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_y = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _y : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SocketGateway.prototype, "handleConnection", null);
SocketGateway = SocketGateway_1 = tslib_1.__decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: '/api', transports: ['websocket', 'polling'], cors: true }),
    tslib_1.__metadata("design:paramtypes", [typeof (_z = typeof events_service_1.EventsService !== "undefined" && events_service_1.EventsService) === "function" ? _z : Object, typeof (_0 = typeof widgets_service_1.WidgetsService !== "undefined" && widgets_service_1.WidgetsService) === "function" ? _0 : Object])
], SocketGateway);
exports.SocketGateway = SocketGateway;


/***/ }),

/***/ "./src/socket/socket.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SocketModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("./node_modules/@nestjs/config/index.js");
const socket_gateway_1 = __webpack_require__("./src/socket/socket.gateway.ts");
const services_module_1 = __webpack_require__("./src/services/services.module.ts");
let SocketModule = class SocketModule {
};
SocketModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => services_module_1.ServicesModule), config_1.ConfigModule
        ],
        providers: [socket_gateway_1.SocketGateway],
        exports: [socket_gateway_1.SocketGateway]
    })
], SocketModule);
exports.SocketModule = SocketModule;


/***/ }),

/***/ "../../libs/data/src/constants/index.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TestConstant = void 0;
exports.TestConstant = 'TEST';


/***/ }),

/***/ "../../libs/data/src/database.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = exports.modelsToInclude = void 0;
const tslib_1 = __webpack_require__("tslib");
const config_1 = __webpack_require__("../../libs/data/node_modules/@nestjs/config/index.js");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const models_1 = __webpack_require__("../../libs/data/src/models/index.ts");
const services_1 = __webpack_require__("../../libs/data/src/services/index.ts");
const db_migration_entity_1 = __webpack_require__("../../libs/data/src/models/db-migration.entity.ts");
exports.modelsToInclude = [
    db_migration_entity_1.DbMigration,
    models_1.Channel,
    models_1.User,
    models_1.Widget
];
class DatabaseModule extends typeorm_1.TypeOrmModule {
    static forRootAsync(options) {
        const oldUseFactory = options.useFactory;
        if (oldUseFactory) {
            options.useFactory = (...args) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const sourceOptions = yield oldUseFactory(...args);
                return Object.assign(Object.assign({}, sourceOptions), { entities: [
                        ...((sourceOptions === null || sourceOptions === void 0 ? void 0 : sourceOptions.entities) || []),
                        ...exports.modelsToInclude
                    ] });
            });
        }
        const module = super.forRootAsync(options);
        return this.ExtendModuleWithCustomServices(module);
    }
    static forRoot(options) {
        const module = super.forRoot(Object.assign(Object.assign({}, options), { entities: [
                ...(options.entities || []),
                ...exports.modelsToInclude
            ] }));
        return this.ExtendModuleWithCustomServices(module);
    }
    static ExtendModuleWithCustomServices(module) {
        const servicesToAdd = [
            services_1.DatabaseMigrationService
        ];
        return Object.assign(Object.assign({}, module), { imports: [
                ...(module.imports || []),
                config_1.ConfigModule
            ], providers: [
                ...(module.providers || []),
                ...servicesToAdd
            ], exports: [
                ...(module.exports || []),
                ...servicesToAdd
            ] });
    }
}
exports.DatabaseModule = DatabaseModule;


/***/ }),

/***/ "../../libs/data/src/extensions/base-filters-extensions.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getOffsetOptionFromFilter = exports.getLimitOptionFromFilter = exports.getOrderOptionsFromFilter = void 0;
function getOrderOptionsFromFilter(filter) {
    var _a;
    return (_a = filter.orderedBy) === null || _a === void 0 ? void 0 : _a.reduce((acc, v) => (Object.assign(Object.assign({}, acc), { [v.field]: v.isReversed ? 'DESC' : 'ASC' })), {});
}
exports.getOrderOptionsFromFilter = getOrderOptionsFromFilter;
function getLimitOptionFromFilter(filter, defaultSize = 10) {
    return filter.pageSize || defaultSize || null;
}
exports.getLimitOptionFromFilter = getLimitOptionFromFilter;
function getOffsetOptionFromFilter(filter) {
    if (filter.page)
        return getLimitOptionFromFilter(filter) * (filter.page - 1);
    else
        return null;
}
exports.getOffsetOptionFromFilter = getOffsetOptionFromFilter;


/***/ }),

/***/ "../../libs/data/src/extensions/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../libs/data/src/extensions/base-filters-extensions.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/data/src/extensions/list-with-totals-extensions.ts"), exports);


/***/ }),

/***/ "../../libs/data/src/extensions/list-with-totals-extensions.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const SelectQueryBuilder_1 = __webpack_require__("typeorm/query-builder/SelectQueryBuilder");
const base_filters_extensions_1 = __webpack_require__("../../libs/data/src/extensions/base-filters-extensions.ts");
SelectQueryBuilder_1.SelectQueryBuilder.prototype.getManyWithTotals = function (filter, disableTotalsCalculation = false) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const currentLimit = (0, base_filters_extensions_1.getLimitOptionFromFilter)(filter);
        const currentOffset = (0, base_filters_extensions_1.getOffsetOptionFromFilter)(filter);
        const totalCountReq = disableTotalsCalculation ? null : this.getCount();
        const currentPageReq = this.limit(currentLimit).offset(currentOffset).getMany();
        const [totalCount, currentPage] = yield Promise.all([totalCountReq, currentPageReq]);
        return {
            list: currentPage,
            limit: currentLimit,
            offset: currentOffset,
            total: totalCount
        };
    });
};


/***/ }),

/***/ "../../libs/data/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../libs/data/src/database.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/data/src/models/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/data/src/constants/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/data/src/services/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/data/src/interfaces/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/data/src/extensions/index.ts"), exports);


/***/ }),

/***/ "../../libs/data/src/interfaces/config-params.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../libs/data/src/interfaces/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../libs/data/src/interfaces/config-params.ts"), exports);


/***/ }),

/***/ "../../libs/data/src/migrations/20220114133300.CreateUsersTable.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUsersTable20220114133300 = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
class CreateUsersTable20220114133300 {
    constructor() {
        this.name = '20220114133300.CreateUsersTable';
    }
    up(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { context: { queryRunner } } = params;
            yield queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid'
                    },
                    {
                        name: 'name',
                        type: 'text',
                        isNullable: false
                    },
                    {
                        name: 'email',
                        type: 'text',
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: 'password',
                        type: 'text',
                        isNullable: false
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        isNullable: false
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        isNullable: true
                    },
                ]
            }));
        });
    }
    down(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { context: { queryRunner } } = params;
            yield queryRunner.dropTable('users');
        });
    }
}
exports.CreateUsersTable20220114133300 = CreateUsersTable20220114133300;


/***/ }),

/***/ "../../libs/data/src/migrations/20230118145608.CreateStreamsTable.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateStreamsTable20230118145608 = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
class CreateStreamsTable20230118145608 {
    constructor() {
        this.name = '20230118145608.CreateStreamsTable';
    }
    up(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { context: { queryRunner } } = params;
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'streams',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid'
                    },
                    {
                        name: 'name',
                        type: 'text',
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: 'key',
                        type: 'text',
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: 'ingestEndpoint',
                        type: 'text',
                        isNullable: false
                    },
                    {
                        name: 'playbackURL',
                        type: 'text',
                        isNullable: false
                    },
                    {
                        name: 'ARN',
                        type: 'text',
                        isNullable: false
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        isNullable: false
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        isNullable: true
                    }
                ]
            }));
        });
    }
    down(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { context: { queryRunner } } = params;
            yield queryRunner.dropTable('streams');
        });
    }
}
exports.CreateStreamsTable20230118145608 = CreateStreamsTable20230118145608;


/***/ }),

/***/ "../../libs/data/src/migrations/20230120171731.CreateWidgetsTable.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateWidgetsTable20230120171731 = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
class CreateWidgetsTable20230120171731 {
    constructor() {
        this.name = '20230120171731.CreateWidgetsTable';
    }
    up(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { context: { queryRunner } } = params;
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'widgets',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid'
                    },
                    {
                        name: 'title',
                        type: 'text',
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: 'url',
                        type: 'text',
                        isNullable: false
                    },
                    {
                        name: 'price',
                        type: 'numeric',
                        isNullable: false
                    },
                    {
                        name: 'startX',
                        type: 'smallint',
                        isNullable: false
                    },
                    {
                        name: 'startY',
                        type: 'smallint',
                        isNullable: false
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        isNullable: false
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        isNullable: true
                    }
                ]
            }));
            yield queryRunner.addColumn('widgets', new typeorm_1.TableColumn({
                name: 'streamId',
                type: 'uuid'
            }));
            yield queryRunner.createForeignKey('widgets', new typeorm_1.TableForeignKey({
                columnNames: ['streamId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'streams',
                onDelete: 'CASCADE'
            }));
        });
    }
    down(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { context: { queryRunner } } = params;
            yield queryRunner.dropTable('widgets');
        });
    }
}
exports.CreateWidgetsTable20230120171731 = CreateWidgetsTable20230120171731;


/***/ }),

/***/ "../../libs/data/src/migrations/20230130235651.AlterStreamsTableRenameTableToChannels.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AlterStreamsTableRenameTableToChannels20230130235651 = void 0;
const tslib_1 = __webpack_require__("tslib");
class AlterStreamsTableRenameTableToChannels20230130235651 {
    constructor() {
        this.name = '20230130235651.AlterStreamsTableRenameTableToChannels';
    }
    up(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { context: { queryRunner } } = params;
            yield queryRunner.renameTable('streams', 'channels');
        });
    }
    down(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { context: { queryRunner } } = params;
            yield queryRunner.renameTable('channels', 'streams');
        });
    }
}
exports.AlterStreamsTableRenameTableToChannels20230130235651 = AlterStreamsTableRenameTableToChannels20230130235651;


/***/ }),

/***/ "../../libs/data/src/migrations/20230131005425.AlterWidgetsTableRenameColumn.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AlterWidgetsTableRenameColumn20230131005425 = void 0;
const tslib_1 = __webpack_require__("tslib");
class AlterWidgetsTableRenameColumn20230131005425 {
    constructor() {
        this.name = '20230131005425.AlterWidgetsTableRenameColumn';
    }
    up(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { context: { queryRunner }, } = params;
            yield queryRunner.renameColumn('widgets', 'streamId', 'channelId');
        });
    }
    down(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { context: { queryRunner }, } = params;
            yield queryRunner.renameColumn('widgets', 'channelId', 'streamId');
        });
    }
}
exports.AlterWidgetsTableRenameColumn20230131005425 = AlterWidgetsTableRenameColumn20230131005425;


/***/ }),

/***/ "../../libs/data/src/migrations/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const _20220114133300_CreateUsersTable_1 = __webpack_require__("../../libs/data/src/migrations/20220114133300.CreateUsersTable.ts");
const _20230118145608_CreateStreamsTable_1 = __webpack_require__("../../libs/data/src/migrations/20230118145608.CreateStreamsTable.ts");
const _20230120171731_CreateWidgetsTable_1 = __webpack_require__("../../libs/data/src/migrations/20230120171731.CreateWidgetsTable.ts");
const _20230130235651_AlterStreamsTableRenameTableToChannels_1 = __webpack_require__("../../libs/data/src/migrations/20230130235651.AlterStreamsTableRenameTableToChannels.ts");
const _20230131005425_AlterWidgetsTableRenameColumn_1 = __webpack_require__("../../libs/data/src/migrations/20230131005425.AlterWidgetsTableRenameColumn.ts");
// --imports_section_end
const migrationsList = [
    new _20220114133300_CreateUsersTable_1.CreateUsersTable20220114133300(),
    new _20230118145608_CreateStreamsTable_1.CreateStreamsTable20230118145608(),
    new _20230120171731_CreateWidgetsTable_1.CreateWidgetsTable20230120171731(),
    new _20230130235651_AlterStreamsTableRenameTableToChannels_1.AlterStreamsTableRenameTableToChannels20230130235651(),
    new _20230131005425_AlterWidgetsTableRenameColumn_1.AlterWidgetsTableRenameColumn20230131005425(),
    // --migrations_list_end
];
exports["default"] = migrationsList;


/***/ }),

/***/ "../../libs/data/src/models/channel.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Channel = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const _1 = __webpack_require__("../../libs/data/src/models/index.ts");
let Channel = class Channel {
    beforeInsert() {
        this.createdAt = new Date();
    }
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", String)
], Channel.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Channel.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Channel.prototype, "key", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Channel.prototype, "ingestEndpoint", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Channel.prototype, "playbackURL", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Channel.prototype, "ARN", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Widget, (widget) => widget.channel, { cascade: ['insert', 'update'] }),
    tslib_1.__metadata("design:type", Array)
], Channel.prototype, "widgets", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Channel.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Channel.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Channel.prototype, "beforeInsert", null);
Channel = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'channels' })
], Channel);
exports.Channel = Channel;


/***/ }),

/***/ "../../libs/data/src/models/db-migration.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DbMigration = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
let DbMigration = class DbMigration {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], DbMigration.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], DbMigration.prototype, "migrated_at", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], DbMigration.prototype, "name", void 0);
DbMigration = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'database_migrations' })
], DbMigration);
exports.DbMigration = DbMigration;


/***/ }),

/***/ "../../libs/data/src/models/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../libs/data/src/models/user.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/data/src/models/channel.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/data/src/models/widget.entity.ts"), exports);


/***/ }),

/***/ "../../libs/data/src/models/user.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
let User = class User {
    beforeInsert() {
        this.createdAt = new Date();
    }
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], User.prototype, "beforeInsert", null);
User = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], User);
exports.User = User;


/***/ }),

/***/ "../../libs/data/src/models/widget.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Widget = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const models_1 = __webpack_require__("../../libs/data/src/models/index.ts");
let Widget = class Widget {
    beforeInsert() {
        this.createdAt = new Date();
    }
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", String)
], Widget.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Widget.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Widget.prototype, "url", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 14, scale: 2 }),
    tslib_1.__metadata("design:type", Number)
], Widget.prototype, "price", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('smallint'),
    tslib_1.__metadata("design:type", Number)
], Widget.prototype, "startX", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('smallint'),
    tslib_1.__metadata("design:type", Number)
], Widget.prototype, "startY", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Widget.prototype, "channelId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => models_1.Channel, channel => channel.widgets),
    tslib_1.__metadata("design:type", typeof (_a = typeof models_1.Channel !== "undefined" && models_1.Channel) === "function" ? _a : Object)
], Widget.prototype, "channel", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Widget.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Widget.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Widget.prototype, "beforeInsert", null);
Widget = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'widgets' })
], Widget);
exports.Widget = Widget;


/***/ }),

/***/ "../../libs/data/src/services/database-migration.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DatabaseMigrationService_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseMigrationService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("typeorm");
const umzug_1 = __webpack_require__("umzug");
const type_orm_umzug_storage_1 = __webpack_require__("../../libs/data/src/services/type-orm-umzug.storage.ts");
const config_1 = __webpack_require__("../../libs/data/node_modules/@nestjs/config/index.js");
const migrations_1 = __webpack_require__("../../libs/data/src/migrations/index.ts");
const db_migration_entity_1 = __webpack_require__("../../libs/data/src/models/db-migration.entity.ts");
let DatabaseMigrationService = DatabaseMigrationService_1 = class DatabaseMigrationService {
    constructor(connection, configService) {
        this.connection = connection;
        this.configService = configService;
        this.tableName = 'database_migrations';
    }
    onModuleInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.migrateAuto();
        });
    }
    migrateAuto() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!(this.configService.get('NX_DATABASE_ENABLE_MIGRATIONS') === 'true')) {
                return;
            }
            yield this.migrate(migrations_1.default);
        });
    }
    migrate(migrationsList) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryRunner = this.connection.createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction();
            let pendingMigrations;
            yield this.createTableIfNotExist(queryRunner);
            yield queryRunner.commitTransaction();
            yield queryRunner.startTransaction();
            try {
                const umzug = new umzug_1.Umzug({
                    migrations: migrationsList,
                    context: () => ({
                        queryRunner,
                        logger: DatabaseMigrationService_1.logger,
                    }),
                    storage: new type_orm_umzug_storage_1.TypeOrmUmzugStorage(),
                    logger: {
                        info: (message) => { DatabaseMigrationService_1.logger.log(message); },
                        debug: (message) => { DatabaseMigrationService_1.logger.debug(message); },
                        error: (message) => { DatabaseMigrationService_1.logger.error(message); },
                        warn: (message) => { DatabaseMigrationService_1.logger.warn(message); }
                    }
                });
                DatabaseMigrationService_1.logger.log('Migrations are enabled. Running...');
                pendingMigrations = yield umzug.pending();
                if (pendingMigrations.length) {
                    yield umzug.up();
                    DatabaseMigrationService_1.logger.log('Migrations complete');
                }
                else {
                    DatabaseMigrationService_1.logger.log('No pending migrations found');
                }
                yield queryRunner.commitTransaction();
            }
            catch (e) {
                DatabaseMigrationService_1.logger.error('Exception occurred when migrating', e.message);
                yield queryRunner.rollbackTransaction();
                yield queryRunner.manager.delete(db_migration_entity_1.DbMigration, {
                    name: (0, typeorm_1.In)(pendingMigrations.map((x) => x.name))
                });
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    createTableIfNotExist(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: this.tableName,
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid'
                    },
                    {
                        name: 'migrated_at',
                        type: 'timestamp'
                    },
                    {
                        name: 'name',
                        type: 'text'
                    }
                ]
            }), true);
        });
    }
};
DatabaseMigrationService.logger = new common_1.Logger('DatabaseMigrationService');
DatabaseMigrationService = DatabaseMigrationService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Connection !== "undefined" && typeorm_1.Connection) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], DatabaseMigrationService);
exports.DatabaseMigrationService = DatabaseMigrationService;


/***/ }),

/***/ "../../libs/data/src/services/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../libs/data/src/services/database-migration.service.ts"), exports);


/***/ }),

/***/ "../../libs/data/src/services/type-orm-umzug.storage.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeOrmUmzugStorage = void 0;
const tslib_1 = __webpack_require__("tslib");
const db_migration_entity_1 = __webpack_require__("../../libs/data/src/models/db-migration.entity.ts");
class TypeOrmUmzugStorage {
    executed(meta) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const migrations = yield meta.context.queryRunner.manager.find(db_migration_entity_1.DbMigration);
            return migrations.map(x => x.name);
        });
    }
    logMigration(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield params.context.queryRunner.manager.insert(db_migration_entity_1.DbMigration, { migrated_at: new Date(), name: params.name });
        });
    }
    unlogMigration(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield params.context.queryRunner.manager.delete(db_migration_entity_1.DbMigration, { name: params.name });
        });
    }
}
exports.TypeOrmUmzugStorage = TypeOrmUmzugStorage;


/***/ }),

/***/ "../../libs/shared/src/enums/ionic-requisites.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IonicRequisitesEnum = void 0;
var IonicRequisitesEnum;
(function (IonicRequisitesEnum) {
    IonicRequisitesEnum["Id"] = "51d57649-s8tc-hc97-9rm5-3e5ffef1zuq1l";
})(IonicRequisitesEnum = exports.IonicRequisitesEnum || (exports.IonicRequisitesEnum = {}));


/***/ }),

/***/ "../../libs/shared/src/enums/socket.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SocketEnum = void 0;
var SocketEnum;
(function (SocketEnum) {
    SocketEnum["JoinPlayer"] = "join-player";
    SocketEnum["LeftPlayer"] = "left-player";
    SocketEnum["JoinWidgets"] = "join-widgets";
    SocketEnum["LeftWidgets"] = "left-widgets";
    SocketEnum["ReceivedPlaybackUrl"] = "received-playback-url";
    SocketEnum["ReceivedWidgets"] = "received-widgets";
    SocketEnum["JoinVisibleWidgets"] = "join-visible-widgets";
    SocketEnum["LeftVisibleWidgets"] = "left-visible-widgets";
    SocketEnum["ReceivedVisibleWidgets"] = "received-visible-widgets";
    SocketEnum["JoinPurchasedWidgets"] = "join-purchased-widgets";
    SocketEnum["LeftPurchasedWidgets"] = "left-purchased-widgets";
    SocketEnum["PurchasedWidget"] = "purchased-widget";
})(SocketEnum = exports.SocketEnum || (exports.SocketEnum = {}));


/***/ }),

/***/ "../../libs/shared/src/enums/user-roles.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRolesEnum = void 0;
var UserRolesEnum;
(function (UserRolesEnum) {
    UserRolesEnum["Admin"] = "25e102f4-7ee1-4fca-9071-f16e03da237b";
    UserRolesEnum["User"] = "12c57649-f88c-4c97-9a75-3e5ffef1b9d6";
})(UserRolesEnum = exports.UserRolesEnum || (exports.UserRolesEnum = {}));


/***/ }),

/***/ "../../libs/shared/src/enums/widgets-socket-events.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WidgetsSocketEventsEnum = void 0;
var WidgetsSocketEventsEnum;
(function (WidgetsSocketEventsEnum) {
    WidgetsSocketEventsEnum["WidgetsReceived"] = "widgets.received";
    WidgetsSocketEventsEnum["StreamReceived"] = "stream.received";
    WidgetsSocketEventsEnum["WidgetsShown"] = "widgets.shown";
    WidgetsSocketEventsEnum["WidgetPurchased"] = "widget.purchased";
})(WidgetsSocketEventsEnum = exports.WidgetsSocketEventsEnum || (exports.WidgetsSocketEventsEnum = {}));


/***/ }),

/***/ "../../libs/shared/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../libs/shared/src/interfaces/filters/order.filter.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/shared/src/interfaces/filters/order-param-pair.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/shared/src/interfaces/filters/pagination.filter.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/shared/src/interfaces/error.response.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/shared/src/models/dto/test.dto.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/shared/src/models/dto/user.dto.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/shared/src/models/dto/user-creation.dto.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/shared/src/models/dto/channel.dto.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/shared/src/models/dto/channel-creation.dto.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/shared/src/models/dto/widget.dto.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/shared/src/models/dto/stream-playback.dto.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/shared/src/models/filters/user.filter.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/shared/src/models/filters/channel.filter.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/shared/src/models/filters/widget.filter.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/shared/src/models/dto/list-with-totals.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/shared/src/enums/user-roles.enum.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/shared/src/enums/socket.enum.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/shared/src/enums/widgets-socket-events.enum.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/shared/src/enums/ionic-requisites.enum.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/shared/src/utils/utility-types.ts"), exports);


/***/ }),

/***/ "../../libs/shared/src/interfaces/error.response.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../libs/shared/src/interfaces/filters/order-param-pair.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../libs/shared/src/interfaces/filters/order.filter.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../libs/shared/src/interfaces/filters/pagination.filter.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../libs/shared/src/models/constants/channel-dto.constants.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const regExps = {
    name: /^[A-Za-z0-9_-]*$/
};
exports["default"] = regExps;


/***/ }),

/***/ "../../libs/shared/src/models/constants/user-dto.constants.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const regExps = {
    lastName: /^([A-Z][a-z]+)?(-[A-Z][a-z]*)?$/,
    name: /^[A-Z][a-z]+(-[A-Z][a-z]*)?$/,
    password: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&_*].*)/
};
exports["default"] = regExps;


/***/ }),

/***/ "../../libs/shared/src/models/constants/widget-dto.constants.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const regExps = {
    coord: /^[1-9][0-9]{0,2}$/,
    price: /^(?!0+[0-9])[0-9]{1,12}(?:\.\d{1,2})?$/,
    title: /^[A-Za-z0-9_-]*$/
};
exports["default"] = regExps;


/***/ }),

/***/ "../../libs/shared/src/models/dto/channel-creation.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../libs/shared/src/models/dto/channel.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChannelDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
const channel_dto_constants_1 = __webpack_require__("../../libs/shared/src/models/constants/channel-dto.constants.ts");
class ChannelDto {
}
tslib_1.__decorate([
    (0, class_validator_1.Matches)(channel_dto_constants_1.default.name, {
        message: 'Wrong symbols!',
    }),
    (0, class_validator_1.MinLength)(2, {
        message: 'Name is too short or empty'
    }),
    (0, class_validator_1.MaxLength)(20, {
        message: 'Name is too long',
    }),
    tslib_1.__metadata("design:type", String)
], ChannelDto.prototype, "name", void 0);
exports.ChannelDto = ChannelDto;


/***/ }),

/***/ "../../libs/shared/src/models/dto/list-with-totals.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListWithTotals = void 0;
class ListWithTotals {
}
exports.ListWithTotals = ListWithTotals;


/***/ }),

/***/ "../../libs/shared/src/models/dto/stream-playback.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StreamPlaybackDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class StreamPlaybackDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], StreamPlaybackDto.prototype, "playbackUrl", void 0);
exports.StreamPlaybackDto = StreamPlaybackDto;


/***/ }),

/***/ "../../libs/shared/src/models/dto/test.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../libs/shared/src/models/dto/user-creation.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../libs/shared/src/models/dto/user.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignUpDto = exports.LoginDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
const user_dto_constants_1 = __webpack_require__("../../libs/shared/src/models/constants/user-dto.constants.ts");
class LoginDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.Matches)(user_dto_constants_1.default.password, {
        message: 'Password must include upper & lower case letters, a number, a special character'
    }),
    (0, class_validator_1.MinLength)(6, {
        message: 'Password is too short'
    }),
    (0, class_validator_1.MaxLength)(20, {
        message: 'Password is too long'
    }),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
exports.LoginDto = LoginDto;
class SignUpDto {
}
tslib_1.__decorate([
    (0, class_validator_1.Matches)(user_dto_constants_1.default.name, {
        message: 'Only Latin! First character - a capital letter'
    }),
    (0, class_validator_1.MinLength)(2, {
        message: 'Name is too short'
    }),
    (0, class_validator_1.MaxLength)(20, {
        message: 'Name is too long'
    }),
    tslib_1.__metadata("design:type", String)
], SignUpDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.Matches)(user_dto_constants_1.default.lastName, {
        message: 'Only Latin! First character - a capital letter'
    }),
    (0, class_validator_1.MinLength)(2, {
        message: 'Lastname is too short'
    }),
    (0, class_validator_1.MaxLength)(25, {
        message: 'Lastname is too long'
    }),
    tslib_1.__metadata("design:type", String)
], SignUpDto.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], SignUpDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.Matches)(user_dto_constants_1.default.password, {
        message: 'Password must include upper & lower case letters, a number, a special character'
    }),
    (0, class_validator_1.MinLength)(6, {
        message: 'Password is too short'
    }),
    (0, class_validator_1.MaxLength)(20, {
        message: 'Password is too long'
    }),
    tslib_1.__metadata("design:type", String)
], SignUpDto.prototype, "password", void 0);
exports.SignUpDto = SignUpDto;


/***/ }),

/***/ "../../libs/shared/src/models/dto/widget.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WidgetIdsDto = exports.WidgetInStoreDto = exports.WidgetDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
const widget_dto_constants_1 = __webpack_require__("../../libs/shared/src/models/constants/widget-dto.constants.ts");
class WidgetDto {
}
tslib_1.__decorate([
    (0, class_validator_1.Matches)(widget_dto_constants_1.default.title, {
        message: 'Wrong symbols!',
    }),
    (0, class_validator_1.MinLength)(2, {
        message: 'Name is too short or empty'
    }),
    (0, class_validator_1.MaxLength)(20, {
        message: 'Name is too long',
    }),
    tslib_1.__metadata("design:type", String)
], WidgetDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsUrl)(),
    tslib_1.__metadata("design:type", String)
], WidgetDto.prototype, "url", void 0);
tslib_1.__decorate([
    (0, class_validator_1.Matches)(widget_dto_constants_1.default.price, {
        message: 'Enter correct number for price',
    }),
    (0, class_validator_1.NotEquals)('0', {
        message: 'Price must be greater than zero'
    }),
    tslib_1.__metadata("design:type", Number)
], WidgetDto.prototype, "price", void 0);
tslib_1.__decorate([
    (0, class_validator_1.Matches)(widget_dto_constants_1.default.coord, {
        message: 'Must be greater than zero. Maximum - 3 digits',
    }),
    tslib_1.__metadata("design:type", Number)
], WidgetDto.prototype, "startX", void 0);
tslib_1.__decorate([
    (0, class_validator_1.Matches)(widget_dto_constants_1.default.coord, {
        message: 'Must be greater than zero. Maximum - 3 digits',
    }),
    tslib_1.__metadata("design:type", Number)
], WidgetDto.prototype, "startY", void 0);
exports.WidgetDto = WidgetDto;
class WidgetInStoreDto extends WidgetDto {
}
exports.WidgetInStoreDto = WidgetInStoreDto;
class WidgetIdsDto {
}
exports.WidgetIdsDto = WidgetIdsDto;


/***/ }),

/***/ "../../libs/shared/src/models/filters/channel.filter.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../libs/shared/src/models/filters/user.filter.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../libs/shared/src/models/filters/widget.filter.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../libs/shared/src/utils/utility-types.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "@aws-sdk/client-ivs":
/***/ ((module) => {

module.exports = require("@aws-sdk/client-ivs");

/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/common/utils/shared.utils":
/***/ ((module) => {

module.exports = require("@nestjs/common/utils/shared.utils");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/event-emitter":
/***/ ((module) => {

module.exports = require("@nestjs/event-emitter");

/***/ }),

/***/ "@nestjs/jwt":
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/passport":
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/platform-socket.io":
/***/ ((module) => {

module.exports = require("@nestjs/platform-socket.io");

/***/ }),

/***/ "@nestjs/serve-static":
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");

/***/ }),

/***/ "@nestjs/swagger":
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@nestjs/terminus":
/***/ ((module) => {

module.exports = require("@nestjs/terminus");

/***/ }),

/***/ "@nestjs/typeorm":
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "@nestjs/websockets":
/***/ ((module) => {

module.exports = require("@nestjs/websockets");

/***/ }),

/***/ "bcryptjs":
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "class-validator":
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "dotenv":
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "dotenv-expand":
/***/ ((module) => {

module.exports = require("dotenv-expand");

/***/ }),

/***/ "express":
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "lodash":
/***/ ((module) => {

module.exports = require("lodash");

/***/ }),

/***/ "nest-winston":
/***/ ((module) => {

module.exports = require("nest-winston");

/***/ }),

/***/ "passport-jwt":
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "passport-local":
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),

/***/ "socket.io":
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),

/***/ "swagger-stats":
/***/ ((module) => {

module.exports = require("swagger-stats");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "typeorm":
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "typeorm/query-builder/SelectQueryBuilder":
/***/ ((module) => {

module.exports = require("typeorm/query-builder/SelectQueryBuilder");

/***/ }),

/***/ "umzug":
/***/ ((module) => {

module.exports = require("umzug");

/***/ }),

/***/ "uuid":
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),

/***/ "winston":
/***/ ((module) => {

module.exports = require("winston");

/***/ }),

/***/ "fs":
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const core_1 = __webpack_require__("@nestjs/core");
const nest_winston_1 = __webpack_require__("nest-winston");
const swStats = __webpack_require__("swagger-stats");
const winston = __webpack_require__("winston");
const common_1 = __webpack_require__("@nestjs/common");
const app_module_1 = __webpack_require__("./src/app.module.ts");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const all_exceptions_filter_1 = __webpack_require__("./src/exceptions-filters/all-exceptions.filter.ts");
const bad_request_exceptions_filter_1 = __webpack_require__("./src/exceptions-filters/bad-request-exceptions.filter.ts");
const platform_socket_io_1 = __webpack_require__("@nestjs/platform-socket.io");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const transports = [];
        if (false) {}
        else {
            transports.push(new winston.transports.Console({
                format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), nest_winston_1.utilities.format.nestLike()),
                level: 'debug'
            }));
        }
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, {
            cors: true,
            logger: nest_winston_1.WinstonModule.createLogger({
                transports,
            }),
        });
        // app.enableCors({ origin: 'http://localhost:4200', credentials: true });
        app.enableCors();
        const config = new swagger_1.DocumentBuilder()
            .setTitle('API')
            .setVersion('1.0')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('docs', app, document);
        app.useGlobalFilters(new all_exceptions_filter_1.default(), new bad_request_exceptions_filter_1.default());
        app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
        app.setGlobalPrefix('api');
        app.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(app));
        app.use(swStats.getMiddleware({ swaggerSpec: document }));
        yield app.listen(3000);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map