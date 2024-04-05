using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class EnemyHealth : MonoBehaviour
{
    public float health = 100f;
    public Image healthFillImage;

    public void TakeDamage(float damage)
    {
        health -= damage;
        UpdateHealthBar();
        if (health <= 0)
        {
            Debug.Log("Enemy defeated!");
            Destroy(gameObject); // Destroy enemy or trigger death animation
        }
    }

    private void UpdateHealthBar()
    {
        healthFillImage.rectTransform.sizeDelta = new Vector2(health / 100, healthFillImage.rectTransform.sizeDelta.y);
    }
}
