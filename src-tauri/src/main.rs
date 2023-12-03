// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use halleypack::halley;
use std::path::PathBuf;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[tauri::command(async)]
fn copy_assets(src: PathBuf, dst: PathBuf, force: Option<bool>) {
    halley::assets::utils::copy_assets(&src, &dst, force);
}

#[tauri::command(async)]
fn unpack(src: PathBuf, dst: PathBuf, pack_version: halley::PackVersion, secret: Option<String>) {
    halley::unpack_assets(&src, &dst, pack_version, secret.as_deref());
}

#[tauri::command(async)]
fn pack(src: PathBuf, dst: PathBuf, pack_version: halley::PackVersion, secret: Option<String>) {
    halley::pack_assets(&src, &dst, pack_version, secret.as_deref());
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![copy_assets, unpack, pack,])
        .plugin(tauri_plugin_store::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
