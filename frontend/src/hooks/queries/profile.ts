import { AxiosRequestConfig } from "axios"
import { useStoreDispatch } from "hooks/useStoreSelector"
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { DispatchToast } from "store"
import apiRequest from "utils/axios"

type profileQuery = {
  (
    method: string,
    successMessage?: string,
    failMessage?: string,
  ): UseQueryResult
}
type profileMutation = {
  (
    method: string,
    successMessage?: string,
    failMessage?: string,
  ): UseMutationResult
}
