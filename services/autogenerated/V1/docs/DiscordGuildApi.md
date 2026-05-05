# DiscordGuildApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**checks**](#checks) | **POST** /api/v1.0/discordguild/checks | |

# **checks**
> APIDaneyModelsAuthGetTokenResponse checks()


### Example

```typescript
import {
    DiscordGuildApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DiscordGuildApi(configuration);

let request_body: Array<number>; // (optional)

const { status, data } = await apiInstance.checks(
    request_body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request_body** | **Array<number>**|  | |


### Return type

**APIDaneyModelsAuthGetTokenResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

