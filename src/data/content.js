// 角色与版型数据：优先从后端 /api/manual/content 拉取（数据库直改、即时生效），
// 拉取失败时回退到本地内置数据，保证后端不可用时主站仍能打开。
import { roles as builtinRoles, roleMap as builtinRoleMap } from './roles'
import { variants as builtinVariants, variantMap as builtinVariantMap } from './variants'

export let roles = builtinRoles
export let variants = builtinVariants
export let roleMap = builtinRoleMap
export let variantMap = builtinVariantMap

export async function initContent() {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 3000)
    const res = await fetch('/api/manual/content', { signal: controller.signal })
    clearTimeout(timer)
    if (!res.ok) return
    const body = await res.json()
    const data = body && body.data
    if (Array.isArray(data?.roles) && data.roles.length) {
      roles = data.roles
      roleMap = Object.fromEntries(roles.map((r) => [r.id, r]))
    }
    if (Array.isArray(data?.variants) && data.variants.length) {
      variants = data.variants
      variantMap = Object.fromEntries(variants.map((v) => [v.id, v]))
    }
  } catch {
    // 网络或后端异常：静默使用内置兜底数据
  }
}
