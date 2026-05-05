# DiscordCategoryApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getCategories**](#getcategories) | **GET** /api/v1.0/discordcategory/get-categories | |

# **getCategories**
> Array<APIDaneyModelsCommonSelectItem> getCategories()


### Example

```typescript
import {
    DiscordCategoryApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DiscordCategoryApi(configuration);

let guildID: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.getCategories(
    guildID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **guildID** | [**number**] |  | (optional) defaults to undefined|


### Return type

**Array<APIDaneyModelsCommonSelectItem>**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

