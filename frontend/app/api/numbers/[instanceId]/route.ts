import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { connectInstance, disconnectInstance, getInstanceStatus } from '@/lib/api/evolution'

// GET - Obter QR Code para conectar
export async function GET(
  request: NextRequest,
  { params }: { params: { instanceId: string } }
) {
  try {
    const { instanceId } = params

    // Buscar QR Code da Evolution API
    const qrData = await connectInstance(instanceId)

    // Atualizar no banco
    await query(
      'UPDATE whatsapp_numbers SET qr_code = $1, status = $2, updated_at = CURRENT_TIMESTAMP WHERE instance_id = $3',
      [qrData.qrcode.base64, 'connecting', instanceId]
    )

    return NextResponse.json({ qrcode: qrData.qrcode })
  } catch (error) {
    console.error('Error getting QR code:', error)
    return NextResponse.json(
      { error: 'Failed to get QR code' },
      { status: 500 }
    )
  }
}

// DELETE - Desconectar número
export async function DELETE(
  request: NextRequest,
  { params }: { params: { instanceId: string } }
) {
  try {
    const { instanceId } = params

    // Desconectar na Evolution API
    try {
      await disconnectInstance(instanceId)
    } catch (error) {
      console.error('Error disconnecting from Evolution API:', error)
    }

    // Atualizar no banco
    await query(
      'UPDATE whatsapp_numbers SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE instance_id = $2',
      ['disconnected', instanceId]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error disconnecting number:', error)
    return NextResponse.json(
      { error: 'Failed to disconnect number' },
      { status: 500 }
    )
  }
}

