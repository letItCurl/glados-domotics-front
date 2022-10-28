import coreApiClient from "@/providers/core-api/CoreApi"

export default {
  getEntities() {
    return coreApiClient.sendRequest("get", "/entities", {})
  },
  patchEntity(id, payload) {
    return coreApiClient.sendRequest("patch", `/entities/${id}`, payload)
  },
}
